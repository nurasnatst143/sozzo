"use server";

import mongoose from "mongoose";
import Post from "../../../models/post";
import connectDB from "../../../config/connectDB";

export async function fetchPostById(id) {
	try {
		await connectDB();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new Error("Invalid post ID");
		}

		const post = await Post.findById(id).lean().exec();
		if (!post) {
			throw new Error("Post not found");
		}

		return post;
	} catch (error) {
		console.error("Error fetching post:", error.message);
		throw error;
	}
}
