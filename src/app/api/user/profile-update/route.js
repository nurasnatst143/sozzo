import cloudinary from "../../../../../config/cloudinary";
import connectDB from "../../../../../config/connectDB";
import User from "../../../../../models/user";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const PUT = async (req) => {
	try {
		await connectDB();

		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return new Response("Unauthorized", { status: 401 });
		}

		const formData = await req.formData();

		const name = formData.get("name");
		const username = formData.get("username");
		const interests = formData.getAll("interests[]");
		const notificationsEnabled =
			formData.get("notificationsEnabled") === "true";
		const image = formData.get("image"); // could be File or null

		const user = await User.findOne({ email: session.user.email });
		if (!user) {
			return new Response("User not found", { status: 404 });
		}

		// Username change logic
		if (username && username !== user.username) {
			const now = new Date();

			if (user.lastUsernameChange) {
				const daysSinceChange = Math.floor(
					(now - user.lastUsernameChange) / (1000 * 60 * 60 * 24)
				);
				if (daysSinceChange < 90) {
					return new Response("You can change your username every 90 days.", {
						status: 403,
					});
				}
			}

			// Check if reserved by another user
			const reserved = await User.findOne({
				reservedUsernames: {
					$elemMatch: {
						name: username,
						expiresAt: { $gt: now },
					},
				},
			});

			if (reserved) {
				return new Response("This username is currently reserved.", {
					status: 409,
				});
			}

			// Reserve the old username
			if (user.username) {
				user.reservedUsernames.push({
					name: user.username,
					expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
				});
			}

			user.username = username;
			user.lastUsernameChange = now;
		}

		user.name = name || user.name;
		user.interests = interests || [];
		user.notificationsEnabled = notificationsEnabled;

		// Image upload
		if (image && typeof image !== "string") {
			if (user.image?.includes("cloudinary.com")) {
				const publicId = user.image.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(`sozoo/${publicId}`);
			}

			const buffer = Buffer.from(await image.arrayBuffer());
			const base64 = buffer.toString("base64");

			const uploadResult = await cloudinary.uploader.upload(
				`data:image/png;base64,${base64}`,
				{
					folder: "sozoo",
				}
			);

			user.image = uploadResult.secure_url;
		}

		await user.save();

		return new Response(JSON.stringify({ user }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.error("Profile update error:", err);
		return new Response("Something went wrong", { status: 500 });
	}
};
