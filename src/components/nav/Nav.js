"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import ThemeSwitch from "./ThemeSwitch";
import BrandLogo from "@/data/images/brandLogo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import SumMenu from "./submenu";
import { BellIcon } from "lucide-react";

const Nav = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	const [menuOpen, setMenuOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const inputRef = useRef(null);

	const handleMenu = () => setMenuOpen(!menuOpen);

	useEffect(() => {
		if (!searchTerm.trim()) {
			setSuggestions([]);
			return;
		}

		const timeout = setTimeout(async () => {
			try {
				const res = await fetch(`/api/posts/search?q=${searchTerm}`);
				const data = await res.json();
				console.log(data);

				setSuggestions(data.posts);
			} catch (err) {
				console.error("Failed to fetch search suggestions", err);
			}
		}, 300);

		return () => clearTimeout(timeout);
	}, [searchTerm]);

	const handleSelect = (slug) => {
		router.push(`/posts/${slug}`);
		setSearchTerm("");
		setSuggestions([]);
	};

	return (
		<div className='flex justify-between w-full h-[80px] bg-sky lg:gap-8 py-2 px-2 items-center relative'>
			<Link href='/'>
				<Image
					src={BrandLogo}
					className='md:ml-5'
					width={60}
					height={50}
					alt='logo'
				/>
			</Link>

			<div className='relative w-[260px] md:w-[40vw] flex gap-2 pr-3'>
				<input
					ref={inputRef}
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search'
					className='px-3 lg:px-5 py-1 sm:py-2 rounded-full w-full outline-black dark:outline-white border-gray-600 text-black text-sm md:text-xl border-2'
				/>
				{suggestions.length > 0 && (
					<ul className='absolute top-full left-0 right-0 bg-background dark:bg-gray-800 shadow-lg z-50 mt-2 rounded-md overflow-hidden max-h-72 overflow-y-auto'>
						{suggestions.map((post) => (
							<li
								key={post._id}
								className='flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
								onClick={() => handleSelect(post._id)}
							>
								<Image
									src={post.image?.imageurl || "/placeholder.jpg"}
									alt={post.title}
									width={40}
									height={40}
									className='rounded-md object-cover'
								/>
								<span className='text-sm text-black dark:text-white'>
									{post.title}
								</span>
							</li>
						))}
					</ul>
				)}

				<div className='flex items-center gap-4'>
					<BellIcon />
					<ThemeSwitch />
					{menuOpen ? (
						<MdOutlineClose
							className='text-2xl cursor-pointer'
							onClick={handleMenu}
						/>
					) : (
						<MdOutlineMenu
							className='text-2xl cursor-pointer'
							onClick={handleMenu}
						/>
					)}
				</div>
			</div>

			<div
				className={`${
					menuOpen ? "" : "hidden"
				} absolute right-0 top-14 bg-sky dark:bg-gray-700 w-52 py-5 rounded-md z-50`}
			>
				<SumMenu
					onClose={() => setMenuOpen(!menuOpen)}
					session={session}
					status={status}
				/>
			</div>
		</div>
	);
};

export default Nav;
