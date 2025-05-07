import connectDB from "../../../../../../config/connectDB";
import Post from "../../../../../../models/post";

export const GET = async (request, { params }) => {
	try {
		await connectDB();
		const post = await Post.findById(params.id);

		if (!post) {
			return new Response("Post not found", { status: 404 });
		}

		post.isHeadLine = !post.isHeadLine;
		await post.save();

		const message = post.isHeadLine ? "Headline Added" : "Headline Removed";
		return new Response(message, { status: 200 });
	} catch (error) {
		console.error("Error toggling headline:", error);
		return new Response("Something went wrong", { status: 500 });
	}
};
