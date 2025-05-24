const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: { type: String, required: true },
		name: { type: String, required: true },
		avatar: { type: String, default: "https://placehold.co/40x40" },
		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);
const Comment =
	mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
