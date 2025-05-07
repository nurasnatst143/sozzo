import connectDB from "../../../../../config/connectDB";

import { revalidatePath } from "next/cache";
import Post from "../../../../../models/post";

export const GET = async (request) => {
	try {
		await connectDB();
		const headlines = await Post.find({ isHeadLine: true }).lean().exec();
		const path = request.nextUrl.searchParams.get("path");

		if (path) {
			revalidatePath(path);
			return new Response(JSON.stringify({ headlines }), {
				status: 200,
			});
		}

		return new Response(JSON.stringify({ headlines }), {
			status: 200,
			headers: {
				"Cache-Control":
					"no-store, no-cache, must-revalidate, proxy-revalidate",
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		return new Response("Something went wrong", { status: 500 });
	}
};
