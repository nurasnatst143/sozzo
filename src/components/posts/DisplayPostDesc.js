"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	LinkedinShareButton,
	PinterestShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	LinkedinIcon,
	PinterestIcon,
} from "react-share";
import { formatDistanceToNow } from "date-fns";

import { FaHeart, FaMessage } from "react-icons/fa6";
import CommentForm from "./CommentForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import Like from "@/components/posts/Like";
import { useRouter } from "next/navigation";

const DisplayPostDesc = ({ news }) => {
	const session = useSession();
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [shareUrl, setShareUrl] = useState("");

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
			router.refresh();
		}
	};
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setIsModalOpen(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	const CopyToClipboardButton = ({ shareUrl }) => {
		const [copied, setCopied] = useState(false);
		const handleCopy = async () => {
			try {
				await navigator.clipboard.writeText(shareUrl);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (err) {
				console.error("Copy failed:", err);
			}
		};
		return (
			<button
				onClick={handleCopy}
				className='bg-muted hover:bg-muted/80 text-sm text-primary px-3 py-1 rounded-full'
			>
				{copied ? "✅ Link Copied!" : "🔗 Copy Link"}
			</button>
		);
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
				<div className='px-10 py-5 flex gap-5 items-center flex-wrap'>
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
					<span className='text-sm text-muted-foreground'>
						{new Date(news.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
					<button
						onClick={() => {
							const origin = window.location.origin;
							setShareUrl(`${origin}/posts/${news._id}`);
							setIsModalOpen(true);
						}}
						className='text-sm text-blue-500 hover:underline'
					>
						🔗 Share
					</button>
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
			{isModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
					<div className='bg-background p-6 rounded-lg shadow-xl max-w-sm w-full'>
						<h2 className='text-xl font-bold mb-2 text-center text-primary'>
							🚀 Share this Post
						</h2>
						<p className='text-center text-sm text-muted-foreground mb-4'>
							Choose a platform:
						</p>
						<div className='flex flex-wrap justify-center gap-4'>
							<FacebookShareButton url={shareUrl} quote={news.title}>
								<FacebookIcon size={40} round />
							</FacebookShareButton>
							<TwitterShareButton url={shareUrl} title={news.title}>
								<TwitterIcon size={40} round />
							</TwitterShareButton>
							<WhatsappShareButton url={shareUrl} title={news.title}>
								<WhatsappIcon size={40} round />
							</WhatsappShareButton>
							<LinkedinShareButton url={shareUrl} title={news.title}>
								<LinkedinIcon size={40} round />
							</LinkedinShareButton>
							<PinterestShareButton url={shareUrl} media={news.image.imageurl}>
								<PinterestIcon size={40} round />
							</PinterestShareButton>
						</div>
						<div className='mt-4 text-center'>
							<CopyToClipboardButton shareUrl={shareUrl} />
						</div>
						<button
							onClick={() => setIsModalOpen(false)}
							className='mt-4 text-sm text-red-500 hover:underline block mx-auto'
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DisplayPostDesc;
