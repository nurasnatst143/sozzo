import { NextResponse } from "next/server";
import connectDB from "../../../../../config/connectDB";
import Post from "../../../../../models/post";
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get("q");

		if (!query || query.trim() === "") {
			return NextResponse.json({ posts: [] });
		}

		await connectDB();

		// Perform a simple text search on title and content
		const posts = await Post.find({
			$or: [
				{ title: { $regex: query, $options: "i" } },
				{ content: { $regex: query, $options: "i" } },
			],
		})
			.limit(5)
			.select("title image createdAt") // Only return necessary fields
			.exec();

		return NextResponse.json({ posts });
	} catch (error) {
		console.error("Search error:", error);
		return NextResponse.json(
			{ message: "Failed to search posts" },
			{ status: 500 }
		);
	}
}
