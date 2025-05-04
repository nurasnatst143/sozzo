import connectDB from "../../../../../config/connectDB";
import Post from "../../../../../models/post";

export const GET = async (request) => {
	try {
		const headers = new Headers(request.headers);
		const type = headers.get("type");
		await connectDB();
		const posts = await Post.find({ category: type });
		console.log("p", posts);

		return new Response(JSON.stringify({ posts }), {
			status: 200,
		});
	} catch (error) {
		return new Response("Something went wrong", { status: 500 });
	}
};
