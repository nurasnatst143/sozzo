"use client";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import Clock from "./Clock";
import Image from "next/image";
import BrandLogo from "@/data/images/brandLogo.png";

const MarqueeContainer = ({ headlines }) => {
	const [change, setChange] = useState(false);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setChange((state) => !state);
		}, 10000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<>
			{headlines?.length > 0 && (
				<div className='absolute bottom-0 flex w-full ronded-md overflow-hidden'>
					<div className='bg-gray-600 flex justify-center'>
						{change ? (
							<Image
								src={BrandLogo}
								width={67}
								height={67}
								className='px-2'
								alt='brand logo'
							/>
						) : (
							<Clock />
						)}
					</div>

					<Marquee className='bg-[#06f1f944] m-0 p-0' pauseOnHover={true}>
						{headlines?.length &&
							headlines?.map((item) => (
								<h1
									key={item._id}
									className='mx-10 text-xl text-black font-semibold'
								>
									{item.title}
								</h1>
							))}
					</Marquee>
				</div>
			)}
		</>
	);
};

export default MarqueeContainer;
