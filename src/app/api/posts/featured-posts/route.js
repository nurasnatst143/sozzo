import { getFeaturedPosts } from "../../../../lib/featured-posts";

export const GET = async () => {
	try {
		const posts = await getFeaturedPosts();

		return new Response(JSON.stringify({ posts }), {
			status: 200,
		});
	} catch (error) {
		return new Response("Something went wrong", { status: 500 });
	}
};
