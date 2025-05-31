import connectDB from "../../config/connectDB";
import Post from "../../models/post";

export async function getHeadlinePosts() {
	await connectDB();

	const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

	const headlines = await Post.find({
		$or: [{ isHeadLine: true }, { createdAt: { $gte: twentyFourHoursAgo } }],
	})
		.sort({ createdAt: -1 })
		.lean()
		.exec();

	return headlines;
}
