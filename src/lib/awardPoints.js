import PointsTransaction from "@/models/pointsTransaction";
import User from "@/models/user";
import connectDB from "../../config/connectDB";

const pointsRules = {
	sign_up: { points: 100, type: "gain" },
	daily_login: { points: 10, type: "gain" },
	read_article: { points: 5, type: "gain" },
	like_article: { points: 2, type: "gain" },
	like_article_unlike: { points: 2, type: "loss" }, // deduction on unlike
	comment_article: { points: 20, type: "gain" },
	reply_comment: { points: 10, type: "gain" },
	like_received: { points: 5, type: "gain" },
	discussion_started: { points: 50, type: "gain" },
	discussion_liked: { points: 10, type: "gain" },
	discussion_pinned: { points: 50, type: "gain" },
	live_session_hosted: { points: 200, type: "gain" },
	spam_commenting: { points: 50, type: "loss" },
	hate_speech: { points: 100, type: "loss" },
	false_information: { points: 200, type: "loss" },
	user_reported: { points: 50, type: "loss" },
	talks_rule_violation: { points: 100, type: "loss" },
};

export async function awardPoints({
	userId,
	reason,
	articleId = null,
	commentId = null,
	discussionId = null,
	description = "",
}) {
	await connectDB();

	if (!pointsRules[reason]) {
		throw new Error(`Invalid reason for awarding points: ${reason}`);
	}

	const { points, type } = pointsRules[reason];

	const finalPoints = type === "loss" ? -points : points;

	// Create points transaction
	const transaction = await PointsTransaction.create({
		userId,
		points: finalPoints,
		reason,
		articleId,
		commentId,
		discussionId,
		type,
		description,
	});

	// Update user total points atomically
	await User.findByIdAndUpdate(userId, { $inc: { points: finalPoints } });

	return transaction;
}
