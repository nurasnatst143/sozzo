import connectDB from "../../../../config/connectDB";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import NodeMailer from "nodemailer";
import { redirect } from "next/navigation";

export const POST = async (request) => {
	connectDB();
	try {
		const body = await request.json();

		const hashedPass = await bcrypt.hash(body.password, 10);

		const name = body.name;
		const email = body.email;
		const username = email.split("@")[0];
		const userData = {
			username,
			name,
			email,
			password: hashedPass,
			role: "user",
			status: "pending",
			points: 100,
		};
		console.log("LINE AT 10 sign-up api", userData);

		const res = await User.create(userData);
		console.log("LINE AT 27", res);

		const transporter = NodeMailer.createTransport({
			host: "mail.privateemail.com",
			port: 465, // SSL port
			secure: true, // Use true for port 465,
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
			subject: "Send email from nodemailer",
			text: "test email",
			html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; padding: 20px;">
            <tr>
                <td style="padding: 20px 0; color: #333333;">
                    <h1 style="font-size: 24px; margin: 0;">Welcome to Sozoo Today</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #555555;">
                    <p style="font-size: 16px; line-height: 1.5; margin: 0;">Dear ${name},</p>
                    <p style="font-size: 16px; line-height: 1.5;">Thank you for signing up with <strong>Sozoo Today</strong>! We’re excited to have you on board.</p>
                    <p style="font-size: 16px; line-height: 1.5;">To complete your registration, please confirm your email address by clicking the button below:</p>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <a href="https://www.sozootoday.com/verify/${res._id.toString()}" style="background-color: #28a745; color: #ffffff; padding: 10px 20px; cursor: pointer; text-decoration: none; font-size: 16px; border-radius: 5px;">Confirm Your Email</a>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #555555;">
                    <p style="font-size: 16px; line-height: 1.5;">If you did not sign up for a <strong>Sozoo Today</strong> account, please disregard this email.</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px 0; color: #555555;">
                    <p style="font-size: 16px; line-height: 1.5;">If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:connect@sozootoday.com" style="color: #28a745; text-decoration: none;">connect@sozootoday.com</a>.</p>
                    <p style="font-size: 16px; line-height: 1.5;">Welcome to the <strong>Sozoo Today</strong> community!</p>
                </td>
            </tr>
        </table>
    </body>`,
		};

		await transporter.sendMail(mailOptions);
	} catch (errors) {
		console.log(errors);
		return new Response(
			JSON.stringify(
				{ message: "Server Error", errors: errors },
				{
					status: errors.status,
				}
			)
		);
	}
	// return redirect('https://www.sozootoday.com/sign-up/email-confirmation');
	return new Response(
		JSON.stringify(
			{ message: "successfull" },
			{
				status: 200,
			}
		)
	);
};

export const GET = async (request) => {
	try {
		await connectDB();
		const requestHeaders = new Headers(request.headers);

		const userId = requestHeaders.get("Id");

		const userToVerify = await User.findById(userId);

		if (!userToVerify) {
			return new Response("User Not Found", {
				status: 404,
			});
		}

		userToVerify.status = "verified";

		await userToVerify.save();
		return new Response("User verified successfully", {
			status: 200,
		});
	} catch (error) {
		return new Response("Something Went Wrong", { status: 500 });
	}
};
