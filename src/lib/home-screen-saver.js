// lib/home-screen-saver.ts
import connectDB from "../../config/connectDB";
import { ScreenSaver } from "../../models/home-screen-saver";

// Get screen saver video from DB
export async function getHomeScreenSaver() {
	await connectDB();
	const videoDoc = await ScreenSaver.findOne().lean();
	return videoDoc;
}
