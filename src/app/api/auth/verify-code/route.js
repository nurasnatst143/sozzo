import connectDB from "../../../../../config/connectDB";
import ResetToken from "../../../../../models/resetTokenModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { email, code } = await req.json();
		if (!email || !code) {
			return NextResponse.json({ error: "Missing data" }, { status: 400 });
		}

		await connectDB();

		const token = await ResetToken.findOne({ email, code, used: false });

		if (!token || token.expiresAt < new Date()) {
			return NextResponse.json(
				{ error: "Invalid or expired code" },
				{ status: 400 }
			);
		}

		return NextResponse.json({ message: "Code valid" });
	} catch (err) {
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
