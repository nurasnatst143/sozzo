import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
	{
		authProvider: {
			type: String,
			enum: ["email", "google"],
			required: true,
		},
		googleId: { type: String, default: null },
		facebookId: { type: String, default: null },

		email: {
			type: String,
			required: function () {
				return this.authProvider === "email";
			},
			unique: true,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},

		password: {
			type: String,
			required: function () {
				return this.authProvider === "email";
			},
		},

		username: {
			type: String,
			unique: true,
			sparse: true, // for users who don't set username initially
		},
		lastUsernameChange: {
			type: Date,
		},
		reservedUsernames: [
			{
				name: String,
				expiresAt: Date,
			},
		],

		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default:
				"https://res.cloudinary.com/doq0sfefc/image/upload/v1723838324/avatar_evqh3d.png",
		},

		interests: {
			type: [String],
			default: [],
		},
		notificationsEnabled: {
			type: Boolean,
			default: false,
		},

		role: {
			type: String,
			default: "Reader",
		},
		status: {
			type: String,
			default: "active",
		},
		points: {
			type: Number,
			default: 100, // Signup bonus
		},
	},
	{
		timestamps: true,
	}
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
