import { Schema, model, models } from "mongoose";

const ResetTokenSchema = new Schema({
	email: { type: String, required: true },
	code: { type: String, required: true },
	expiresAt: { type: Date, required: true },
	used: { type: Boolean, default: false },
});

export default models.ResetToken || model("ResetToken", ResetTokenSchema);
