import Notification from "../../../../../models/notification";
import connectDB from "../../../../../config/connectDB";

export const GET = async (req, { params }) => {
	await connectDB();
	const { userId } = params;

	const { searchParams } = new URL(req.url);
	const limit = parseInt(searchParams.get("limit")) || 10;

	try {
		const notifications = await Notification.find({ user: userId })
			.sort({ createdAt: -1 })
			.limit(limit);

		return Response.json({ notifications });
	} catch (error) {
		console.error("Error fetching notifications:", error);
		return Response.json(
			{ error: "Failed to fetch notifications" },
			{ status: 500 }
		);
	}
};

export const PATCH = async (req, { params }) => {
	try {
		await connectDB();
		console.log("hit");
		const { userId } = params;
		await Notification.findByIdAndUpdate(userId, { isRead: true });
		return new Response(JSON.stringify({ success: true }));
	} catch (err) {
		console.error("Mark as read failed", err);
		return new Response("Error", { status: 500 });
	}
};
