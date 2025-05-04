const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		parent_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			default: null,
		},

		order_by: {
			type: Number,
			default: 0,
		},
		is_featured: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{
		timestamps: true,
	}
);

export const Category =
	mongoose.models.Category || mongoose.model("Category", CategorySchema);
