import Post from "../../../../../../models/post";
import connectDB from "../../../../../../config/connectDB";
export const GET = async (request, { params }) => {
	try {
		await connectDB();
		const post = await Post.findById(params.id);

		if (!post) {
			return new Response("Post not found", { status: 404 });
		}

		if (!post.isPined) {
			// Unpin all other posts
			await Post.updateMany({ isPined: true }, { $set: { isPined: false } });

			// Pin the selected post
			post.isPined = true;
			await post.save();
			return new Response("Successfully Pinned", { status: 200 });
		} else {
			// If it's already pinned, just unpin it
			post.isPined = false;
			await post.save();
			return new Response("Successfully Unpinned", { status: 200 });
		}
	} catch (error) {
		console.error("Error toggling Pin Post:", error);
		return new Response("Something went wrong", { status: 500 });
	}
};
