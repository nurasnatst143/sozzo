import connectDB from "../../../../../config/connectDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import cloudinary from "../../../../../config/cloudinary";
import Post from "../../../../../models/post";
import User from "../../../../../models/user";
import Notification from "../../../../../models/notification";

export const POST = async (request) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session || session?.user?.role !== "admin") {
			return new Response("Unauthorized", { status: 401 });
		}

		await connectDB();
		const formData = await request.formData();

		const title = formData.get("title");
		const description = formData.get("description");
		const category = formData.get("category");
		const image = formData.get("image");
		const featured = formData.get("featured") || false;
		const viralPost = formData.get("viralPost") || false;

		const imageBuffer = await image.arrayBuffer();
		const imageArray = Array.from(new Uint8Array(imageBuffer));
		const imageData = Buffer.from(imageArray);
		const imageBase64 = imageData.toString("base64");

		const result = await cloudinary.uploader.upload(
			`data:image/png;base64,${imageBase64}`,
			{ folder: "sozoo" }
		);

		const newPost = new Post({
			title,
			description,
			category,
			image: {
				imageurl: result.secure_url,
				public_id: result.public_id,
			},
			featured,
			viralPost,
		});

		await newPost.save();

		// ✅ Notify users with 500+ points
		const eligibleUsers = await User.find({ points: { $gte: 100 } }, "_id");

		const notifications = eligibleUsers.map((user) => ({
			user: user._id,
			title: `New post: ${title}`,
			link: `/posts/${newPost._id}`,
		}));

		await Notification.insertMany(notifications);

		return Response.redirect(`${process.env.URL_DOMAIN}/admin/all-posts`);
	} catch (error) {
		console.error("Post creation error:", error);
		return new Response("Failed to add post", { status: 500 });
	}
};
