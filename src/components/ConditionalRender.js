"use client";

import { useEffect, useState } from "react";
import InitVideo from "./InitVideo";
import CarouselContainer from "./Carousel/CarouselContainer";
import BrandLogo from "@/data/images/brandLogo.png";
import Image from "next/image";
const ConditionalRender = ({ videoUrl, slidedata }) => {
	const [displayVideo, setDisplayVideo] = useState(videoUrl ? true : false);

	return (
		<div>
			{displayVideo && videoUrl ? (
				<InitVideo cb={setDisplayVideo} url={videoUrl} />
			) : (
				<CarouselContainer slideData={slidedata} />
			)}
		</div>
	);
};

export default ConditionalRender;
