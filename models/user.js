import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcryptjs";

const ROLES = ["admin", "subadmin", "user"];

const userSchema = new Schema(
	{
		authProvider: { type: String, enum: ["email", "google"], required: true },
		googleId: { type: String, default: null },
		facebookId: { type: String, default: null },

		email: {
			type: String,
			lowercase: true,
			trim: true,
			// allow social users to be null; avoid unique null collision with sparse
			unique: true,
			sparse: true,
			required: function () {
				return this.authProvider === "email";
			},
		},
		emailVerified: { type: Boolean, default: false },

		password: {
			type: String,
			select: false, // don't return by default
			minlength: 6,
			required: function () {
				return this.authProvider === "email";
			},
		},

		username: { type: String, unique: true, sparse: true },
		lastUsernameChange: { type: Date },
		reservedUsernames: [{ name: String, expiresAt: Date }],

		name: { type: String, required: true },
		image: {
			type: String,
			default:
				"https://res.cloudinary.com/doq0sfefc/image/upload/v1723838324/avatar_evqh3d.png",
		},

		interests: { type: [String], default: [] },
		notificationsEnabled: { type: Boolean, default: false },

		role: { type: String, enum: ROLES, default: "user", index: true },
		status: {
			type: String,
			enum: ["active", "suspended", "deleted"],
			default: "active",
		},

		points: { type: Number, default: 100 }, // signup bonus
	},
	{ timestamps: true }
);

// // Hash password when changed
// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password") || !this.password) return next();
// 	const salt = await bcrypt.genSalt(12);
// 	this.password = await bcrypt.hash(this.password, salt);
// 	next();
// });

// userSchema.methods.comparePassword = async function (candidate) {
// 	if (!this.password) return false;
// 	return bcrypt.compare(candidate, this.password);
// };

// const roleRank = { user: 1, subadmin: 2, admin: 3 };
// userSchema.methods.hasAtLeastRole = function (minRole) {
// 	return roleRank[this.role] >= roleRank[minRole];
// };

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
export { ROLES };
