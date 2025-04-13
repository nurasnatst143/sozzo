import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: false,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default:
				"https://res.cloudinary.com/doq0sfefc/image/upload/v1723838324/avatar_evqh3d.png",
		},
		role: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		points: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
