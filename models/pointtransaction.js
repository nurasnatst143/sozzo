const mongoose = require("mongoose");

const pointsTransactionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	points: {
		type: Number,
		required: true,
		// Positive or negative number (e.g. +20 or -50)
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer value for points.",
		},
	},
	reason: {
		type: String,
		required: true,
		enum: [
			"sign_up",
			"daily_login",
			"read_article",
			"like_article",
			"comment_article",
			"reply_comment",
			"like_received",
			"discussion_started",
			"discussion_liked",
			"discussion_pinned",
			"live_session_hosted",
			"spam_commenting",
			"hate_speech",
			"false_information",
			"user_reported",
			"talks_rule_violation",
		],
	},
	articleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Article",
		default: null,
	},
	commentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment",
		default: null,
	},
	discussionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SozooTalkDiscussion",
		default: null,
	},
	description: {
		type: String,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Optional: Index for performance
pointsTransactionSchema.index({ userId: 1, createdAt: -1 });

const PointsTransaction = mongoose.model(
	"PointsTransaction",
	pointsTransactionSchema
);

export default PointsTransaction;
