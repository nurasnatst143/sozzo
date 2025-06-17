import PointsTransaction from "../../models/pointtransaction";
import User from "../../models/user";

import connectDB from "../../config/connectDB";

export async function canAwardPoints({ userId, reason }) {
	await connectDB();

	const user = await User.findById(userId).lean();
	if (!user) throw new Error("User not found");

	const now = new Date();
	const startOfDay = new Date(now);
	startOfDay.setHours(0, 0, 0, 0);

	const startOfWeek = new Date(now);
	startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday start
	startOfWeek.setHours(0, 0, 0, 0);

	// Count how many times the user earned points for the reason today/week as needed
	const countToday = await PointsTransaction.countDocuments({
		userId,
		reason,
		createdAt: { $gte: startOfDay },
	});

	const countThisWeek = await PointsTransaction.countDocuments({
		userId,
		reason,
		createdAt: { $gte: startOfWeek },
	});

	// You can extend this switch with other rules too
	switch (reason) {
		case "daily_login":
			// Only 1 daily login bonus per day
			return countToday < 1;

		case "read_article":
			// Max 10 articles per day (5 pts each)
			return countToday < 10;

		case "like_article":
			// Max 20 likes per day (2 pts each)
			return countToday < 20;

		case "comment_article":
			// Max 10 comments per day (20 pts each)
			return countToday < 10;

		case "reply_comment":
			// Max 5 replies per day (10 pts each)
			return countToday < 5;

		case "discussion_started":
			// Only 1 discussion started per day allowed for Leaders & Sozoo Stars
			if (user.points < 5000) return false; // Only Leader+ allowed
			return countToday < 1;

		case "discussion_pinned":
			// Max 3 pins per week for Sozoo Star
			if (user.points < 10000) return false;
			return countThisWeek < 3;

		case "live_session_hosted":
			// Max 1 live session per week for Sozoo Star
			if (user.points < 10000) return false;
			return countThisWeek < 1;

		default:
			// For all other reasons, allow by default
			return true;
	}
}
