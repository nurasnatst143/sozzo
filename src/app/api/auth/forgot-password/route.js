import { NextResponse } from "next/server";
import connectDB from "../../../../../config/connectDB";
import ResetToken from "../../../../../models/resetTokenModel";
import NodeMailer from "nodemailer";
async function sendResetEmail(email, code) {
	const transporter = NodeMailer.createTransport({
		// host: "mail.privateemail.com",
		// port: 465,
		// secure: true,
		service: "gmail",
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	const mailOptions = {
		from: {
			name: "Sozoo Today",
			address: process.env.SMTP_USER,
		},
		to: email,
		subject: "Verification code from sozoo",
		text: `verification password for resetting password : ${code}`,
		html: ``,
	};

	await transporter.sendMail(mailOptions);
}

export async function POST(req) {
	try {
		const { email } = await req.json();

		if (!email || typeof email !== "string") {
			return NextResponse.json({ error: "Invalid email" }, { status: 400 });
		}

		await connectDB();

		const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
		const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

		await ResetToken.findOneAndUpdate(
			{ email },
			{ code, expiresAt: expires, used: false },
			{ upsert: true }
		);

		await sendResetEmail(email, code);

		return NextResponse.json({ message: "Reset code sent to email" });
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		);
	}
}
