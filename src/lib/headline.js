import connectDB from "../../config/connectDB";
import Post from "../../models/post";

export async function getHeadlinePosts() {
	await connectDB();
	const headlines = await Post.find({ isHeadLine: true }).lean().exec();
	return headlines;
}
