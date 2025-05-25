import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "../../../../../config/connectDB";
import Post from "../../../../../models/post";
import Comment from "../../../../../models/commentModel";
import { awardPoints } from "../../../../lib/awardPoints";
import { canAwardPoints } from "../../../../lib/canAwardPoints";
export const POST = async (request) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return new Response("Unauthorized", {
				status: 401,
			});
		}
		console.log(session);

		await connectDB();

		const body = await request.json();
		const { id: postId, message } = body;

		const findPost = await Post.findById(postId);
		if (!findPost) {
			return new Response("Post Not Found", { status: 404 });
		}

		const newComment = await Comment.create({
			user: session.user.id,
			name: session?.user?.name,
			post: postId,
			text: message,
			avatar: session.user.image || "https://placehold.co/40x40",
		});

		const canAward = await canAwardPoints({
			userId: session.user.id,
			reason: "comment_article",
		});
		if (canAward) {
			await awardPoints({ userId: session.user.id, reason: "comment_article" });
		} else {
			console.log(
				"User has reached the limit or does not qualify for these points."
			);
		}

		// Optional: fetch and return the full comment with user info
		const populatedComment = await Comment.findById(newComment._id)
			.populate("user", "name image")
			.lean();

		return new Response(JSON.stringify({ comment: populatedComment }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error creating comment:", error);
		return new Response("Something Went Wrong", { status: 500 });
	}
};
