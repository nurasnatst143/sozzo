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
import { getViralPosts } from "@/utils/utils";
import { signOut } from "next-auth/react";

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
	console.log("se", session);

	return (
		<>
			<div className='fixed w-full h-full  top-0 left-0 overflow-x-hidden bg-white transition-transform duration-300 ease-out z-[200] bg-custom-gradient '>
				<div className='flex justify-between py-2 px-14 bg-sky-600 dark:bg-gray-700'>
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
										<Link href={session?.user.role === "user" ? "/" : "/admin"}>
											{session?.user.role === "user" ? "Home" : "Dashboard"}
										</Link>
									</div>
									<div className='flex justify-end md:justify-start items-center  mb-2  w-full mr-[20px] text-xl md:text-md space-x-2 px-4'>
										<Link href={session?.user.role === "user" ? "/" : "/admin"}>
											Settings
										</Link>
									</div>
									{session?.user.role === "user" && (
										<div className='flex justify-end md:justify-start items-center  mb-2  w-full mr-[20px] text-xl md:text-md space-x-2 px-4'>
											{session?.user?.points || 0} Points
										</div>
									)}
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

							<div className='flex  md:flex-col lg:flex-row gap-10'>
								<div className='relative flex-1 w-full lg:w-1/2  '>
									<div className='hidden md:flex items-center mb-[14px]'>
										<h2 className='tracking-[.41em] text-[13px] font-bold text-black dark:text-white mr-2 '>
											CATEGORIES
										</h2>
										<span className='h-[1px] bg-white flex-1'></span>
									</div>
									<div className='flex flex-col md:flex-row flex-wrap items-center md:items-start justify-between w-full text-black dark:text-white '>
										{categories.map((category) => (
											<div key={category.id} className='w-1/3'>
												<Link
													className='hover:scale-[1.05] transition-transform text-xl  md:text-lg font-bold leading-6 no-underline mb-5 block duration-150  ease-in-out  font-sans'
													role='presentation'
													href={category.url}
												>
													{category.title}
												</Link>
											</div>
										))}
									</div>
								</div>
								<div className='hidden lg:block w-[1px] bg-gray-200 dark:bg-gray-700 self-stretch mx-4 h-20 mt-8'></div>
								<div className='flex-1 w-full lg:w-1/2 pl-0 lg:pl-[34px] hidden md:block'>
									<div className='flex items-center mb-[14px]'>
										<h2 className='tracking-[.41em] text-[13px] pr-4 font-bold text-black dark:text-white'>
											OUR CHANNELS
										</h2>
										<span className='h-[1px] bg-white flex-1'></span>
									</div>
									<div className='flex flex-wrap justify-between category_items text-black dark:text-white'>
										{socials.map((social) => (
											<div key={social.id} className='w-1/3'>
												<a
													className='hover:scale-[1.05] transition-transform  text-lg font-bold leading-6 no-underline mb-5 block duration-150  ease-in-out  font-sans'
													role='presentation'
													href={social.url}
													target='_blank'
												>
													{social.icon}
												</a>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mx-auto max-w-[75%] mb-11 hidden md:block'>
					<div className='mb-2 lg:mb-[30px] lg:text-[22px] text-base lg:text-[#e0dede] text-white font-bold'>
						<div className='hidden lg:block max-w-2xl mb-9'>
							<div className='flex pt-4 pr-4 pb-2 flex-1 items-center'>
								<span className='pr-3 lg:uppercase text-black dark:text-white text-lg lg:text-[13px] lg:tracking-[4px] font-bold leading-[20px]'>
									Viral posts
								</span>
								<span className='bg-[#ffec41] h-[2px] flex-1 hidden lg:inline-block'></span>
							</div>
						</div>
					</div>

					<div className=''>
						{posts.status === "loading" ? (
							<div className='text-center font-bold text-2xl py-10'>
								Loading...
							</div>
						) : (
							<div className='max-w-[1100px]'>
								<Swiper
									modules={[Navigation, Autoplay]}
									spaceBetween={15}
									slidesPerView={"auto"}
									navigation
								>
									{posts?.data.map((show, index) => (
										<SwiperSlide key={index} style={{ width: "250px" }}>
											<div className='showSlide relative lg:w-[250px] lg:h-[365px] w-[167px] h-[287px] rounded-md'>
												<img
													src={show.image.imageurl}
													alt={show.title}
													className='absolute w-full h-full inset-0 object-cover rounded-md'
												/>
												<div className='sliderImageOverlay'></div>
												<div className='flex flex-col h-full'>
													<div className='flex-1 z-10 relative'>
														<Link
															className='absolute top-0 right-0 bottom-0 left-0'
															href={`/posts/${show._id}`}
														>
															<span></span>
														</Link>
													</div>
													<div className='p-3 z-10'>
														<button
															type='button'
															className='flex flex-col text-left'
														>
															<div className='h-2/12 w-2/12'>
																<svg
																	width='28'
																	height='16'
																	fill='currentColor'
																	xmlns='http://www.w3.org/2000/svg'
																>
																	<path
																		fill='#ADADAD'
																		fillRule='evenodd'
																		d='M13.563 4.445l11.373 11.288 2.189-2.205L13.546.05.07 13.629l2.205 2.19L13.563 4.444z'
																		clipRule='evenodd'
																	></path>
																</svg>
															</div>
															<h4 className='text-white text-xl my-1 font-bold uppercase'>
																{show.title}
															</h4>
														</button>
														<a
															className='flex leading-4 pr-2 items-center showSlideArrow'
															href={show.link}
														>
															<span className='text-sm leading-4 text-[#ffec41]'>
																Watch now
															</span>
															<svg
																width='15'
																height='8'
																viewBox='0 0 15 8'
																fill='none'
																xmlns='http://www.w3.org/2000/svg'
															>
																<path
																	d='M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z'
																	fill='#FFEC41'
																></path>
															</svg>
														</a>
														<span className='text-white block lg:block text-sm leading-4 pt-1'>
															{show.videos}
														</span>
													</div>
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						)}
					</div>
				</div>

				<div className='hidden md:flex justify-between max-w-[75%] mx-auto'>
					<div className='flex justify-between flex-wrap w-[70%] tracking-[.235em] text-black dark:text-white'>
						<Link
							className='w-[33%] mb-[10px] hover:scale-[1.05] transition-transform text-sm  '
							href='/about-us'
						>
							ABOUT US
						</Link>
						<Link
							className='w-[33%] mb-[10px] hover:scale-[1.05] transition-transform text-sm  '
							href='/contact-us'
						>
							CONTACT US
						</Link>
						<Link
							className='w-[33%] mb-[10px] hover:scale-[1.05] transition-transform text-sm  '
							href='/advertise-with-us'
						>
							ADVERTISE WITH US
						</Link>
						<Link
							className='w-[33%] mb-[10px] hover:scale-[1.05] transition-transform text-sm  '
							href='/careers'
						>
							CAREERS
						</Link>
						<Link
							className='w-[33%] mb-[10px] hover:scale-[1.05] transition-transform text-sm  '
							href='/privacy-policy'
						>
							PRIVACY POLICY
						</Link>
						<Link
							className='w-[33%] mb-[10px] hover:scale-[1.05] transition-transform text-sm  '
							href='/terms-and-conditions'
						>
							TERMS AND CONDITIONS
						</Link>
					</div>
					<Link
						className='flex mt-4 hover:scale-105 transition-transform float-right text-xl leading-4 pr-2'
						href='/posts'
					>
						<div className='pr-2  '>View All</div>
						<FaArrowRight className='w-[17] h-[13px]  ' />
					</Link>
				</div>
			</div>
		</>
	);
};

export default SumMenu;
