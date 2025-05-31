import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		title: { type: String, required: true },
		message: { type: String },
		link: { type: String }, // e.g. /posts/xyz
		isRead: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default mongoose.models.Notification ||
	mongoose.model("Notification", notificationSchema);
