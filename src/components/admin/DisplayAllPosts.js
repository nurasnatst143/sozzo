"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { GoHeading } from "react-icons/go";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { getPosts, deletePost as deletePostUtil } from "@/utils/utils";
import { PinIcon, PinOffIcon } from "lucide-react";

const DisplayAllPosts = () => {
	const [status, setStatus] = useState("idle");
	const [posts, setPosts] = useState([]);
	const fetchPosts = async () => {
		try {
			setStatus("loading");
			await getPosts(setPosts);
			setStatus("idle");
		} catch (err) {
			toast.error("Failed to load posts.");
			setPosts([]);
			setStatus("error");
		}
	};
	useEffect(() => {
		fetchPosts();
	}, []);

	const handleHeadline = async (id) => {
		try {
			await axios.get(`/api/posts/headline/${id}`);
			fetchPosts();
			toast.success("Post marked as headline!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to mark headline.");
		}
	};
	const handlePin = async (id) => {
		try {
			await axios.get(`/api/posts/pin-post/${id}`);
			fetchPosts();
			toast.success("Post Pinned Succesfully!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to Pin.");
		}
	};

	const handleDelete = async (id) => {
		try {
			await deletePostUtil(setPosts, id);
			toast.success("Post deleted successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete post.");
		}
	};

	if (status === "loading") {
		return (
			<div className='text-center font-bold text-2xl py-5'>Loading...</div>
		);
	}

	return (
		<div className='px-5'>
			{posts && posts.length > 0 ? (
				<div className='py-5'>
					{posts.map((item) => (
						<div
							key={item._id}
							className='grid grid-cols-5 gap-2 my-3 py-2 px-2 rounded-md bg-gray-400'
						>
							<Link target='_blanck' href={`/posts/${item._id}`}>
								<div className='flex justify-center items-center col-span-1'>
									<Image
										src={item.image.imageurl}
										alt={`photos-${item.id}`}
										width={100}
										height={100}
									/>
								</div>
							</Link>
							<div className='col-span-4'>
								<Link target='_blanck' href={`/posts/${item._id}`}>
									<h1 className='text-xl font-bold mb-2 text-black truncate'>
										{item.title}
									</h1>
								</Link>
								<Link target='_blanck' href={`/posts/${item._id}`}>
									<div
										className='truncate mb-2 text-black'
										dangerouslySetInnerHTML={{
											__html:
												item.description
													.replace(/ style="[^"]*"/g, "")
													.match(/<p[^>]*>(.*?)<\/p>/)?.[1] || "",
										}}
									/>
								</Link>
								<div className='text-2xl flex justify-between items-center gap-2'>
									<div className='flex gap-2 text-lg'>
										<span>{item?.likeCount} Likes</span>
										<span>{item?.commentCount} Comments</span>
									</div>
									<div className="flex gap-2'">
										<div
											className={`bg-sky-500 px-2 py-2 rounded-full  cursor-pointer `}
											onClick={() => handlePin(item._id)}
										>
											{item.isPined ? <PinIcon /> : <PinOffIcon />}
										</div>

										<div
											className={`bg-sky-500 px-2 py-2 rounded-full  cursor-pointer ${
												item.isHeadLine ? "bg-green-500" : ""
											}`}
											onClick={() => handleHeadline(item._id)}
										>
											<GoHeading />
										</div>
										<Link
											href={`/admin/edit-post/${item._id}`}
											className='bg-green-500 px-2 py-2 rounded-full cursor-pointer'
										>
											<RiFileEditFill />
										</Link>
										<div
											className='bg-red-500 px-2 py-2 rounded-full cursor-pointer'
											onClick={() => handleDelete(item._id)}
										>
											<MdDeleteForever />
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='text-2xl font-bold text-center py-5'>
					No Post To Show
				</div>
			)}
		</div>
	);
};

export default DisplayAllPosts;
