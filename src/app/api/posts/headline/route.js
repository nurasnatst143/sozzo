import { getHeadlinePosts } from "../../../../lib/headline";
import { revalidatePath } from "next/cache";

export const GET = async (request) => {
	try {
		const path = new URL(request.url).searchParams.get("path");

		const headlines = await getHeadlinePosts();

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
