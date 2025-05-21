import connectDB from "../../../../../config/connectDB";
import Like from "../../../../../models/likeModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export const POST = async (request) => {
	try {
		await connectDB();
		const session = await getServerSession(authOptions);

		if (!session) {
			return new Response("Unauthorized", { status: 401 });
		}

		const requestHeaders = new Headers(request.headers);
		const postId = requestHeaders.get("Id");

		if (!postId) {
			return new Response("Missing Post ID", { status: 400 });
		}

		// Check if like already exists
		const existingLike = await Like.findOne({
			post: postId,
			user: session.user.id,
		});

		if (existingLike) {
			// Unlike: remove the like
			await Like.deleteOne({ _id: existingLike._id });

			const likeCount = await Like.countDocuments({ post: postId });

			return new Response(JSON.stringify({ liked: false, likeCount }), {
				status: 200,
			});
		} else {
			// Like: create new like
			await Like.create({ post: postId, user: session.user.id });

			const likeCount = await Like.countDocuments({ post: postId });

			return new Response(JSON.stringify({ liked: true, likeCount }), {
				status: 200,
			});
		}
	} catch (error) {
		console.error("Error liking/unliking post:", error);
		return new Response("Something Went Wrong", { status: 500 });
	}
};
