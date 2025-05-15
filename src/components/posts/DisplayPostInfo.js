"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
import Link from "next/link";

const CopyToClipboardButton = ({ shareUrl }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // Reset after 2s
		} catch (err) {
			console.error("Failed to copy:", err);
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

const DisplayPostInfo = ({ news }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [shareUrl, setShareUrl] = useState(""); // Current page URL

	const descriptionSnippet = (() => {
		try {
			const match = news.description
				.replace(/ style="[^"]*"/g, "")
				.match(/<p[^>]*>(.*?)<\/p>/);
			return match ? match[1] : "No description available.";
		} catch {
			return "No description available.";
		}
	})();

	useEffect(() => {
		if (shareUrl && shareUrl !== "") {
			setIsModalOpen(true);
		}
	}, [shareUrl]);

	return (
		<div className='p-4'>
			<div className='bg-background border dark:bg-background rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
				<div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
					<Link href={`posts/${news._id}`}>
						<div className='sm:col-span-1 flex items-center justify-center p-2'>
							<Image
								src={news.image.imageurl}
								width={120}
								height={120}
								alt={news._id}
								className='rounded-lg object-cover h-28 w-28'
							/>
						</div>
					</Link>
					<div className='sm:col-span-3 flex flex-col justify-between p-2 text-primary'>
						<Link href={`posts/${news._id}`}>
							<div>
								<h2 className='text-lg sm:text-xl font-semibold mb-1 text-primary  line-clamp-2'>
									{news.title}
								</h2>
								<p
									className='text-sm sm:text-base text-muted-foreground line-clamp-2'
									dangerouslySetInnerHTML={{ __html: descriptionSnippet }}
								/>
							</div>
						</Link>

						<div className='mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground dark:text-gray-400'>
							<span>👍 {news.likeCount || 0} Likes</span>
							<span>💬 {news.commentCount || 0} Comments</span>
							<span>
								📅{" "}
								{formatDistanceToNow(new Date(news.createdAt), {
									addSuffix: true,
								})}
							</span>
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									const origin = window?.location?.origin || "";
									setShareUrl(`${origin}/posts/${news._id}`);
								}}
								className='ml-auto text-sm text-blue-500 hover:underline'
							>
								🔗 Share
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Share Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
					<div className='bg-background p-6 rounded-lg shadow-xl max-w-sm w-full'>
						<h2 className='text-xl font-bold mb-2 text-center text-primary'>
							🚀 Share this Post Fantastically!
						</h2>
						<p className='text-center text-sm text-muted-foreground mb-4'>
							Choose your favorite platform:
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

						{/* 🔗 Copy Link Button */}
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
export default DisplayPostInfo;
