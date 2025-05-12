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
		subject: "Reset Your Sozoo Today Password",
		text: `Hi there,
	
	We got a request to reset the password for your Sozoo Today account.
	
	If this was you, use the code below to continue:
	
	Your Code: ${code}
	
	This code is valid for a limited time and can only be used once.
	
	If you didn’t request a reset, no worries—your account is still safe. Just ignore this e-mail.
	
	Thank you for using Sozoo Today!
	
	Best Regards,
	Sozoo Today`,
		html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
    <tr>
      <td>
        <h2 style="color: #333333;">Hi there,</h2>
        <p style="font-size: 16px; color: #555555;">
          We got a request to reset the password for your <strong>Sozoo Today</strong> account.
        </p>

        <p style="font-size: 16px; color: #555555;">
          If this was you, use the code below to continue:
        </p>

        <p style="font-size: 18px; color: #111111;">
          <strong>Your Code: ${code}</strong>
        </p>

        <p style="font-size: 16px; color: #555555;">
          This code is valid for a limited time and can only be used once.
        </p>

        <p style="font-size: 16px; color: #555555;">
          If you didn’t request a reset, no worries—your account is still safe. Just ignore this e-mail.
        </p>

        <p style="font-size: 16px; color: #555555;">
          Thank you for using <strong>Sozoo Today</strong>!
        </p>

        <p style="font-size: 16px; color: #555555;">
          Best Regards,<br/>
          <strong>Sozoo Today</strong>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`,
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
