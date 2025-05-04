"use client";
import { FaAngleRight, FaArrowRight, FaBars, FaUser } from "react-icons/fa";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import BrandLogo from "@/data/images/brandLogo.png";
import("swiper/react");
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { socials } from "@/data/social";
import { useEffect, useState } from "react";
import { getPosts, getViralPosts } from "@/utils/utils";
import { useSession, signOut } from "next-auth/react";

const SumMenu = ({ onClose, session, status }) => {
	const clasess =
		"flex flex-row items-center justify-center py-1 capitalize font-semibold hover:font-bold";
	const [posts, setPosts] = useState({
		data: [],
		status: "idle",
	});

	useEffect(() => {
		getViralPosts(setPosts);
		// getPosts(setPosts);
	}, []);
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};
	return (
		<>
			<div className='fixed w-full h-full  top-0 left-0 overflow-x-hidden bg-background transition-transform duration-300 ease-out z-[200] bg-custom-gradient '>
				<div className='flex justify-between py-2 px-14 bg-sky dark:bg-gray-700'>
					<div>
						<Link href='/'>
							<Image src={BrandLogo} width={50} height={50} alt='logo' />
						</Link>
					</div>
					<div className='text-2xl flex items-center gap-4 text-black dark:text-white'>
						<button type='button' onClick={() => onClose()}>
							<MdOutlineClose className='text-2xl   cursor-pointer' />
						</button>
					</div>
				</div>

				<div
					className='max-w-[90%] md:max-w-[75%] mx-auto list-none leading-inherit font-sans tab-[4] 
    text-opacity-100  box-border'
				>
					<div className='mb-8'>
						<div className='pt-[30px]'>
							{status === "authenticated" ? (
								<>
									<div className='flex justify-end md:justify-start items-center  mb-2  w-full mr-[20px] text-xl md:text-md space-x-2 px-4'>
										<Link onClick={() => onClose()} href={"/admin"}>
											Dashboard
										</Link>
									</div>
									<div className='flex justify-end md:justify-start items-center  mb-2  w-full mr-[20px] text-xl md:text-md space-x-2 px-4'>
										<Link href={"/admin"}>Settings</Link>
									</div>
									<div
										className=' flex justify-end md:justify-start items-center  mb-[30px]  w-full mr-[20px] text-xl md:text-md space-x-2 px-4 cursor-pointer'
										onClick={() => signOut()}
									>
										Logout
									</div>
								</>
							) : (
								<>
									<div className=' flex justify-end md:justify-start items-center  mb-[30px]  w-full mr-[20px] text-xl md:text-md space-x-2 px-4'>
										<span>
											<FaUser className='w-[18px] h-[18px] text-white' />
										</span>
										<Link href='/login'>
											<button type='button' className='pl-3 text-white'>
												Sign In
											</button>
										</Link>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SumMenu;
