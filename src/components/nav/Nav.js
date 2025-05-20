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
import { FaSearch } from "react-icons/fa";

const Nav = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [showSearch, setShowSearch] = useState(false);
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
	useEffect(() => {
		const handleClickOutside = (e) => {
			console.log("Clicked outside", e.target);

			if (
				inputRef.current &&
				!inputRef.current.contains(e.target) &&
				!e?.target?.classList.contains("suggestion")
			) {
				setShowSearch(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
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

			<div className=' relative flex justify-end gap-2 w-[260px] md:w-fit pr-1 md:pr-3 '>
				{showSearch ? (
					<div ref={inputRef} className=''>
						<input
							type='text'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder='Search'
							autoFocus
							className='rounded-full border-gray-600 bg-white text-black border-2 w-[150px]    md:w-[320px]'
						/>
					</div>
				) : (
					<button
						className='p-2  hover:text-black dark:text-primary dark:hover:text-gray-300'
						onMouseOver={(e) => {
							e.stopPropagation();
							e.preventDefault();
							setShowSearch(true);
						}}
					>
						<FaSearch className='text-sm md:text-xl   hover:text-black dark:text-background dark:hover:text-gray-300' />
					</button>
				)}

				{suggestions.length > 0 && showSearch && (
					<ul
						id='suggestion'
						className='absolute top-full min-w-[240px] left-0 right-0 bg-background dark:bg-gray-800 shadow-lg z-50 mt-2 rounded-md overflow-hidden max-h-72 overflow-y-auto'
					>
						{suggestions.map((post) => (
							<Link
								key={post._id}
								href={`/posts/${post._id}`}
								className='suggestion'
							>
								<li className='suggestion flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer hover:text-gray-900 dark:hover:text-white'>
									<Image
										src={post.image?.imageurl || "/placeholder.jpg"}
										alt={post.title}
										width={40}
										height={40}
										className='rounded-md suggestion object-cover'
									/>
									<span className='text-sm  suggestion'>{post.title}</span>
								</li>
							</Link>
						))}
					</ul>
				)}

				<div className='flex items-center gap-2 md:gap-4'>
					<BellIcon className='text-sm md:text-xl' />
					<ThemeSwitch className='text-sm md:text-xl' />
					{menuOpen ? (
						<MdOutlineClose
							className=' text-sm md:text-2xl cursor-pointer'
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
