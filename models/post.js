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
	},
	{ timestamps: true }
);

const Post = models.Post || mongoose.model("Post", postSchema);

export default Post;
