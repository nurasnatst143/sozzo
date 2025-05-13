// lib/carousel.ts
import connectDB from "../../config/connectDB";
import Carousel from "../../models/carousel";

export async function getCarouselData() {
	await connectDB();
	const posts = await Carousel.find({}).lean();
	return posts;
}
