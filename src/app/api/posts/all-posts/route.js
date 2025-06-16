import connectDB from "../../../../../config/connectDB";
import Post from "../../../../../models/post";
import { revalidatePath } from "next/cache";

import Like from "../../../../../models/likeModel";
import Comment from "../../../../../models/commentModel";

export const GET = async (request) => {
	try {
		await connectDB();

		const url = new URL(request.url);
		const page = parseInt(url.searchParams.get("page")) || 1;
		const limit = parseInt(url.searchParams.get("limit")) || 10;
		const skip = (page - 1) * limit;
		const pipeline = [
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
				},
			},
		];

		if (skip) pipeline.push({ $skip: skip });
		if (limit) pipeline.push({ $limit: limit });

		const posts = await Post.aggregate(pipeline);

		const postIds = posts.map((post) => post._id);

		// Step 2: Count likes and comments per post
		const [likes, comments] = await Promise.all([
			Like.aggregate([
				{ $match: { post: { $in: postIds } } },
				{ $group: { _id: "$post", count: { $sum: 1 } } },
			]),
			Comment.aggregate([
				{ $match: { post: { $in: postIds } } },
				{ $group: { _id: "$post", count: { $sum: 1 } } },
			]),
		]);

		const likeMap = new Map(
			likes.map((like) => [like._id.toString(), like.count])
		);
		const commentMap = new Map(
			comments.map((comment) => [comment._id.toString(), comment.count])
		);

		// Step 3: Attach counts to posts
		const enrichedPosts = posts.map((post) => ({
			...post,
			likeCount: likeMap.get(post._id.toString()) || 0,
			commentCount: commentMap.get(post._id.toString()) || 0,
		}));

		const total = await Post.countDocuments();

		const path = url.searchParams.get("path");
		if (path) {
			revalidatePath(path);
		}

		return new Response(
			JSON.stringify({
				posts: enrichedPosts,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			}),
			{
				status: 200,
				headers: {
					"Cache-Control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		console.error(error);
		return new Response("Something went wrong", { status: 500 });
	}
};
