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
				<div className='text-center py-10 h-[50vh] text-xl font-semibold text-red-500'>
					Sorry, you need to be logged in and have more than 500 points to view
					Sozoo Talks.
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
