"use client";

import { useEffect, useState } from "react";
import InitVideo from "./InitVideo";
import CarouselContainer from "./Carousel/CarouselContainer";
import BrandLogo from "@/data/images/brandLogo.png";
import Image from "next/image";
const ConditionalRender = () => {
	const [displayVideo, setDisplayVideo] = useState(true);
	const [videoUrl, setVideoUrl] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVideo = async () => {
			try {
				const res = await fetch("/api/home-screen-saver");
				const data = await res.json();
				const url = data?.video?.url;

				if (url) {
					setVideoUrl(url);
				} else {
					setDisplayVideo(false);
				}
			} catch (err) {
				console.error("Failed to fetch video", err);
				setDisplayVideo(false);
			} finally {
				setLoading(false);
			}
		};

		fetchVideo();
	}, []);

	return loading ? (
		<div className='w-full h-full flex items-center justify-center'>
			<p className='text-gray-500 bg-sky-600 text-lg rounded-md'>
				<Image
					src={BrandLogo}
					className='md:ml-5'
					width={200}
					height={200}
					alt='logo'
				/>
			</p>
		</div>
	) : (
		<>
			{displayVideo && videoUrl ? (
				<InitVideo cb={setDisplayVideo} url={videoUrl} />
			) : (
				<CarouselContainer />
			)}
		</>
	);
};

export default ConditionalRender;
