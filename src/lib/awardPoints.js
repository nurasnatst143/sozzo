// lib/points/awardPoints.ts
import PointsTransaction from "@/models/pointsTransaction";
import connectDB from "../../config/connectDB";

export async function awardPoints({
	userId,
	points,
	reason,
	articleId = null,
	commentId = null,
	discussionId = null,
	description = "",
}) {
	await connectDB();
	return await PointsTransaction.create({
		userId,
		points,
		reason,
		articleId,
		commentId,
		discussionId,
		description,
	});
}
