// models/screenSaver.js
import mongoose from "mongoose";

const ScreenSaverSchema = new mongoose.Schema({
	url: String,
	public_id: String,
	uploadedAt: { type: Date, default: Date.now },
});

export const ScreenSaver =
	mongoose.models.ScreenSaver ||
	mongoose.model("ScreenSaver", ScreenSaverSchema);
