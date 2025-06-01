"use server";

import mongoose from "mongoose";
import Post from "../../../models/post";
import Comment from "../../../models/commentModel";
import Like from "../../../models/likeModel";
import connectDB from "../../../config/connectDB";

export async function fetchPostById(id, userId) {
	try {
		await connectDB();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new Error("Invalid post ID");
		}

		// Get post details
		const post = await Post.findById(id).lean();
		if (!post) {
			throw new Error("Post not found");
		}

		// Fetch comments separately
		const comments = await Comment.find({ post: id })
			.sort({ createdAt: -1 })
			.populate("user", "name avatar")
			.lean();

		// Fetch likes separately
		const likes = await Like.find({ post: id }).lean();
		// Check if current user liked the post
		const userLiked = userId
			? likes.some((like) => like.user.toString() === userId.toString())
			: false;

		// Return post with related data
		return JSON.stringify({
			...post,
			comments,
			likes,
			commentCount: comments.length,
			likeCount: likes.length,
			userLiked,
		});
	} catch (error) {
		console.error("Error fetching post:", error.message);
		throw error;
	}
}
