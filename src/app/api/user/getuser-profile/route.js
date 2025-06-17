import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "../../../../../config/connectDB";
import User from "../../../../../models/user"; // adjust path as needed

export const GET = async (request, { params }) => {
	try {
		await connectDB();

		const session = await getServerSession(authOptions);
		const userId = session?.user?.id;

		if (!userId) {
			return new Response("Unauthorized", { status: 401 });
		}

		const user = await User.findById(userId).select("-password").lean(); // Exclude password

		if (!user) {
			return new Response("User not found", { status: 404 });
		}

		return new Response(
			JSON.stringify({
				profile: user,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store",
				},
			}
		);
	} catch (error) {
		console.error(error);
		return new Response("Something went wrong", { status: 500 });
	}
};
