import connectDB from "../../../../../config/connectDB";
import Like from "../../../../../models/likeModel";
import PointsTransaction from "../../../../../models/pointtransaction";
import User from "../../../../../models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export const POST = async (request) => {
	try {
		await connectDB();
		const sessionuser = await getServerSession(authOptions);

		if (!sessionuser) {
			return new Response("Unauthorized", { status: 401 });
		}

		const requestHeaders = new Headers(request.headers);
		const postId = requestHeaders.get("Id");

		if (!postId) {
			return new Response("Missing Post ID", { status: 400 });
		}

		const sessionUserId = sessionuser.user.id;
		const existingLike = await Like.findOne({
			post: postId,
			user: sessionUserId,
		});

		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			if (existingLike) {
				// Unlike: remove the like and deduct points
				await Like.deleteOne({ _id: existingLike._id }).session(session);

				const pointsDeducted = 2;
				await PointsTransaction.create([
					{
						userId: sessionUserId,
						points: -pointsDeducted,
						reason: "like_article",
						type: "loss",
						postId,
						description: "Points deducted for unliking a post",
						session,
					},
				]);

				await User.findByIdAndUpdate(sessionUserId, {
					$inc: { points: -pointsDeducted },
				}).session(session);

				await session.commitTransaction();

				return new Response(JSON.stringify({ liked: false }), { status: 200 });
			} else {
				// Like: create new like and award points
				await Like.create([{ post: postId, user: sessionUserId }], { session });

				const pointsAwarded = 2;
				await PointsTransaction.create([
					{
						userId: sessionUserId,
						points: pointsAwarded,
						reason: "like_article",
						type: "gain",
						postId,
						description: "Points awarded for liking a post",
						session,
					},
				]);

				await User.findByIdAndUpdate(sessionUserId, {
					$inc: { points: pointsAwarded },
				}).session(session);

				await session.commitTransaction();

				return new Response(JSON.stringify({ liked: true }), { status: 200 });
			}
		} catch (error) {
			await session.abortTransaction();
			console.error("Transaction failed:", error);
			return new Response("Transaction failed", { status: 500 });
		} finally {
			session.endSession();
		}
	} catch (error) {
		console.error("Error processing like/unlike:", error);
		return new Response("Something went wrong", { status: 500 });
	}
};
