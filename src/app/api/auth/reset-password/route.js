import connectDB from "../../../../../config/connectDB";
import ResetToken from "../../../../../models/resetTokenModel";
import User from "../../../../../models/user"; // Assuming this exists
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { email, code, newPassword } = await req.json();
		if (!email || !code || !newPassword) {
			return NextResponse.json({ error: "Missing fields" }, { status: 400 });
		}

		await connectDB();

		const token = await ResetToken.findOne({ email, code, used: false });
		if (!token || token.expiresAt < new Date()) {
			return NextResponse.json(
				{ error: "Invalid or expired code" },
				{ status: 400 }
			);
		}

		const hashed = await hash(newPassword, 10);

		const user = await User.findOneAndUpdate({ email }, { password: hashed });

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		token.used = true;
		await token.save();

		return NextResponse.json({ message: "Password reset successful" });
	} catch (err) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		);
	}
}
