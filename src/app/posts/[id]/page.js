import DescWrapper from "@/components/posts/DescWrapper";
import DisplayPostDesc from "@/components/posts/DisplayPostDesc";

import { fetchPostById } from "@/lib/post/findPostById";

const Page = async ({ params }) => {
	const post = await fetchPostById(params.id);
	console.log("post", post);

	if (!post) {
		return (
			<div className='text-center py-10 font-semibold text-xl'>
				Post not found.
			</div>
		);
	}

	return (
		<DescWrapper>
			<DisplayPostDesc news={post} />
		</DescWrapper>
	);
};

export default Page;
