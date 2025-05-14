"use client";

import InfoWrapper from "@/components/posts/InfoWrapper";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getCategoryPosts } from "@/utils/utils";
import PostsContainer from "@/components/posts/PostsContainer";
import { useSession } from "next-auth/react";

const Page = () => {
	const { data: session, status: sessionStatus } = useSession();
	const params = useParams();

	const category = Array.isArray(params.category)
		? params.category.join("/")
		: params.category;

	const [posts, setPosts] = useState({
		data: [],
		status: "loading",
	});

	useEffect(() => {
		if (
			category === "sozoo-talks" &&
			(sessionStatus === "loading" || !session || session?.user?.points <= 500)
		) {
			// Don't fetch posts
			setPosts({ data: [], status: "unauthorized" });
		} else if (category) {
			getCategoryPosts(category, setPosts);
		}
	}, [category, sessionStatus, session]);

	if (posts.status === "unauthorized") {
		return (
			<InfoWrapper>
				<div className='flex justify-center'>
					<div className='text-center py-10 h-[55vh] max-w-[650px] text-xl font-semibold text-red-500'>
						{session?.user
							? "Sorry, you need to have more than 500 points to view Sozoo Talks."
							: "Sorry, you need to be logged in and have more than 500 points to view Sozoo Talks."}
						<p>
							Log in daily, like posts, drop comments, and join exclusive
							conversations with our community. Earn rewards, gain visibility,
							and be part of something bigger—every action counts!
						</p>
					</div>
				</div>
			</InfoWrapper>
		);
	}

	return (
		<InfoWrapper>
			<PostsContainer posts={posts} path={category} />
		</InfoWrapper>
	);
};

export default Page;
