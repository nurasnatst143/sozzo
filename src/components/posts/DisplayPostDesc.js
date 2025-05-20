"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import { FaHeart, FaMessage } from "react-icons/fa6";
import CommentForm from "./CommentForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import Like from "@/components/posts/Like";
import { useRouter } from "next/navigation";

const DisplayPostDesc = ({ news }) => {
	const session = useSession();
	const router = useRouter();

	const [messageForm, setMessageForm] = useState(false);

	const handleLike = async () => {
		if (session.status === "unauthenticated") {
			return router.push("/login");
		}
		const res = await axios.post(
			"/api/posts/like",
			{},
			{
				headers: {
					Id: news?._id,
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
			<div className='bg-background rounded-md py-3 md:py-10'>
				<div className='flex justify-center mb-10'>
					<Image
						src={news?.image.imageurl}
						alt='main photo'
						width={600}
						height={600}
					/>
				</div>
				<div className='px-2 md:px-10'>
					<h1 className='text-2xl font-bold mb-2 md:mb-5 text-primary '>
						{news?.title}
					</h1>
					<div
						className='text-md md:text-lg text-primary'
						dangerouslySetInnerHTML={{
							__html: news?.description.replace(/ style="[^"]*"/g, ""),
						}}
					/>
				</div>
				<div className='px-10 py-5 flex gap-5'>
					<Like handleLike={handleLike} session={session} news={news} />
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
						news={news}
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
