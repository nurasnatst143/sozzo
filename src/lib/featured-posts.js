import connectDB from "../../config/connectDB";
import Post from "../../models/post";

export async function getFeaturedPosts() {
	await connectDB();

	const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

	const posts = await Post.find({
		featured: true,
		createdAt: { $gte: twentyFourHoursAgo },
	})
		.sort({ isPined: -1, createdAt: -1 })
		.lean();

	return posts;
}
