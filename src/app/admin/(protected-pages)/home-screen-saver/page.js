"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
	const [videoUrl, setVideoUrl] = useState(null);

	useEffect(() => {
		const fetchVideo = async () => {
			try {
				const res = await fetch("/api/home-screen-saver");
				const data = await res.json();
				setVideoUrl(data.video.url || null);
			} catch (err) {
				console.error("Failed to fetch video", err);
			}
		};

		fetchVideo();
	}, []);

	return (
		<div>
			<div className='flex justify-end px-4 py-4'>
				<Link
					href='/admin/home-screen-saver/add-item'
					className='bg-green-400 text-white rounded-full px-6 py-2 capitalize font-semibold'
				>
					Add New Video
				</Link>
			</div>

			<div className='max-w-2xl mx-auto px-5 py-6'>
				<h1 className='text-xl font-bold text-center py-6 border-b border-amber-500'>
					Current Home Screen Saver Video
				</h1>

				{videoUrl ? (
					<video
						src={videoUrl}
						controls
						className='w-full rounded shadow mt-6'
					/>
				) : (
					<p className='text-center text-gray-500 mt-6'>
						No screen saver video uploaded yet.
					</p>
				)}
			</div>
		</div>
	);
};

export default Page;
