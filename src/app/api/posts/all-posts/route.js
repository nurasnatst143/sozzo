import connectDB from "../../../../../config/connectDB";
import Post from "../../../../../models/post";
import { revalidatePath } from "next/cache";

export const GET = async (request) => {
	try {
		await connectDB();

		const posts = await Post.aggregate([
			{ $sort: { isPined: -1, createdAt: -1 } },
			{
				$project: {
					title: 1,
					description: 1,
					category: 1,
					featured: 1,
					viralPost: 1,
					isHeadLine: 1,
					isPined: 1,
					image: 1,
					createdAt: 1,
					updatedAt: 1,
					likeCount: { $size: "$likes" },
					commentCount: { $size: "$comments" },
				},
			},
		]);

		const path = request.nextUrl.searchParams.get("path");

		if (path) {
			revalidatePath(path);
		}

		return new Response(JSON.stringify({ posts }), {
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
