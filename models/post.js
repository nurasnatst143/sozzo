import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		featured: {
			type: Boolean,
			required: true,
			default: false,
		},
		viralPost: {
			type: Boolean,
			required: true,
			default: false,
		},
		isHeadLine: { type: Boolean, default: false },
		isPined: { type: Boolean, default: false },
		image: {
			imageurl: {
				type: String,
				required: true,
			},
			public_id: {
				type: String,
				required: true,
			},
		},
		likes: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
				},
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				text: {
					type: String,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				avatar: {
					type: String,
					required: true,
					default: "https://placehold.co/40x40",
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
);

const Post = models.Post || mongoose.model("Post", postSchema);

export default Post;
