import connectDB from "../../config/connectDB";
import Post from "../../models/post";

export async function getFeaturedPosts() {
	await connectDB();
	const posts = await Post.find({ featured: true }).lean();
	return posts;
}
