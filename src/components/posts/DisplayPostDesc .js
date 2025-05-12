"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getPost } from "@/utils/utils";
import { useParams } from "next/navigation";
import { FaHeart, FaMessage } from "react-icons/fa6";
import CommentForm from "./CommentForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import Like from "@/components/posts/Like";
import { useRouter } from "next/navigation";

const DisplayPostDesc = () => {
	const session = useSession();
	const router = useRouter();
	const params = useParams();
	const [news, setNews] = useState({
		data: [],
		status: "loading",
	});

	const [messageForm, setMessageForm] = useState(false);

	useEffect(() => {
		getPost(setNews, params.id);
	}, []);

	if (news.status === "loading") {
		return (
			<div className='text-xl font-semibold text-center py-10 min-h-[80vh]'>
				Loading...
			</div>
		);
	}

	const handleLike = async () => {
		if (session.status === "unauthenticated") {
			return router.push("/login");
		}
		const res = await axios.post(
			"/api/posts/like",
			{},
			{
				headers: {
					Id: news.data._id,
				},
			}
		);
		if (res.status === 200) {
			setNews((x) => ({
				...x,
				data: {
					...x.data,
					likes: res.data.likes,
				},
			}));
		}
	};

	return (
		<div className='max-w-[1400px] mx-auto px-2'>
			<div className='bg-sky-50 dark:bg-gray-600 rounded-md py-10'>
				<div className='flex justify-center mb-10'>
					<Image
						src={news.data.image.imageurl}
						alt='main photo'
						width={600}
						height={600}
					/>
				</div>
				<div className='px-10 text-black'>
					<h1 className='text-2xl font-bold mb-5 text-primary '>
						{news.data.title}
					</h1>
					<div
						className='text-lg text-primary'
						dangerouslySetInnerHTML={{
							__html: news.data.description.replace(/ style="[^"]*"/g, ""),
						}}
					/>
				</div>
				<div className='px-10 py-5 flex gap-5'>
					<Like handleLike={handleLike} session={session} news={news.data} />
					<FaMessage
						className='text-2xl cursor-pointer'
						onClick={() => {
							if (session.status === "unauthenticated") {
								return router.push("/login");
							}
							setMessageForm(!messageForm);
						}}
					/>
				</div>
				<div>
					<CommentForm
						news={news.data}
						setPost={setNews}
						messageForm={messageForm}
						setMessageForm={setMessageForm}
						session={session}
						router={router}
					/>
				</div>
			</div>
		</div>
	);
};

export default DisplayPostDesc;
