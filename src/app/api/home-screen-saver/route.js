import connectDB from "../../../../config/connectDB";
import { ScreenSaver } from "../../../../models/home-screen-saver.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import cloudinary from "../../../../config/cloudinary";

export const POST = async (request) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session || session?.user?.role !== "admin") {
			return new Response("Unauthorized", { status: 401 });
		}

		await connectDB();

		const formData = await request.formData();
		const file = formData.get("video");

		const buffer = await file.arrayBuffer();
		const byteArray = Array.from(new Uint8Array(buffer));
		const data = Buffer.from(byteArray);
		const base64 = data.toString("base64");
		const mimeType = file.type;

		// Upload new video
		const uploaded = await cloudinary.uploader.upload(
			`data:${mimeType};base64,${base64}`,
			{
				folder: "sozoo/home-screensaver",
				resource_type: "video",
			}
		);

		// Check if a video exists in DB
		const existing = await ScreenSaver.findOne();

		// If exists, delete previous from Cloudinary
		if (existing) {
			await cloudinary.uploader.destroy(existing.public_id, {
				resource_type: "video",
			});
			await ScreenSaver.deleteMany(); // in case multiple accidentally exist
		}

		// Save new video
		const newEntry = new ScreenSaver({
			url: uploaded.secure_url,
			public_id: uploaded.public_id,
		});

		await newEntry.save();

		return new Response(
			JSON.stringify({ message: "Video uploaded", url: uploaded.secure_url }),
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error(error);
		return new Response("Video upload failed", { status: 500 });
	}
};

export const GET = async () => {
	try {
		await connectDB();
		const video = await ScreenSaver.findOne();
		return new Response(JSON.stringify({ video }), { status: 200 });
	} catch (err) {
		return new Response("Error fetching video", { status: 500 });
	}
};
