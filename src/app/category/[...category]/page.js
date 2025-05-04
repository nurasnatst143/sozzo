"use client";

import InfoWrapper from "@/components/posts/InfoWrapper";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getCategoryPosts } from "@/utils/utils";
import PostsContainer from "@/components/posts/PostsContainer";

const Page = () => {
	const params = useParams();
	const category = Array.isArray(params.category)
		? params.category.join("/") // in case it's a slug like "news/tech"
		: params.category;

	const [posts, setPosts] = useState({
		data: [],
		status: "loading",
	});

	useEffect(() => {
		if (category) {
			getCategoryPosts(category, setPosts);
		}
	}, [category]);

	return (
		<InfoWrapper>
			<PostsContainer posts={posts} path={category} />
		</InfoWrapper>
	);
};

export default Page;
