import DescWrapper from "@/components/posts/DescWrapper";
import DisplayPostDesc from "@/components/posts/DisplayPostDesc";
import { fetchPostById } from "@/lib/post/findPostById";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = async ({ params }) => {
	const session = await getServerSession(authOptions);

	const postJson = await fetchPostById(params.id, session?.user?.id);
	const post = JSON.parse(postJson);

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
