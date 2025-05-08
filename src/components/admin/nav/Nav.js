"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import ThemeSwitch from "./ThemeSwitch";
import BrandLogo from "@/data/images/brandLogo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import SumMenu from "./submenu";

const Nav = () => {
	const { data: session, status } = useSession();

	const [menuOpen, setMenuOpen] = useState(false);
	const clasess =
		"flex flex-row items-center justify-center py-1 capitalize font-semibold hover:font-bold";
	const router = useRouter();

	const handleMenu = () => {
		setMenuOpen((state) => !state);
	};

	return (
		<div className='flex justify-between bg-sky lg:gap-8 py-2 px-2 items-center relative'>
			<Link href='/'>
				<Image src={BrandLogo} width={50} height={50} alt='logo' />
			</Link>
			<div className='relative w-[260px] md:w-[40vw] flex gap-2 items-center pr-3'>
				<input
					type='text'
					placeholder='SEARCH'
					className='px-3 lg:px-5 py-1 sm:py-2 rounded-full w-full outline-black dark:outline-white border-gray-600 text-black text-sm md:text-xl border-2'
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							const queriesData = e.target.value;
							if (queriesData) {
								localStorage.setItem("queriesData", queriesData);
								router.push("/search-news");
							}
						}
					}}
				/>

				<ThemeSwitch />
				{menuOpen ? (
					<MdOutlineClose
						className='text-2xl  cursor-pointer'
						onClick={handleMenu}
					/>
				) : (
					<MdOutlineMenu
						className='text-2xl  cursor-pointer'
						onClick={handleMenu}
					/>
				)}
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

{
	/* <Link href="/business" className={clasess}>
          business
        </Link>
        <Link href="/politics" className={clasess}>
          politics
        </Link>
        <Link href="/sports" className={clasess}>
          sports
        </Link>
        <Link href="/pop-culture" className={clasess}>
          pop culture
        </Link>
        <Link href="/education" className={clasess}>
          education
        </Link>
        <Link href="/opinion" className={clasess}>
          opinion
        </Link>
        {status === 'authenticated' ? (
          <>
            <Link
              href={session?.user.role === 'user' ? '/user' : '/admin'}
              className={clasess}
            >
              Dashboard
            </Link>
            <div
              className={`${clasess} cursor-pointer`}
              onClick={() => signOut()}
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className={clasess}>
              Login
            </Link>
            <Link href="/sign-up" className={clasess}>
              Sign up
            </Link>
          </>
        )} */
}

const shows = [
	{
		title: "Slice Of Life",
		image:
			"https://wp.scoopwhoop.com/wp-content/uploads/2022/08/e65ff0dc-ae94-42a0-b112-e187f97b07b3.jpg",
		videos: "139 videos",
		link: "/show/drunk-friend/?ref=watch_shows",
	},
	{
		title: "Cheap Vs Expensive",
		image:
			"https://wp.scoopwhoop.com/wp-content/uploads/2022/08/7f1f7960-df14-447b-9482-0efb6fe67c32.jpg",
		videos: "16 videos",
		link: "/show/cheapvsexpensive/?ref=watch_shows",
	},
	{
		title: "Interviews",
		image:
			"https://wp.scoopwhoop.com/wp-content/uploads/2022/08/dccb282f-ad01-4b92-a472-6dfe67d97403.jpg",
		videos: "18 videos",
		link: "/show/interview/?ref=watch_shows",
	},
	{
		title: "FIQ",
		image:
			"https://wp.scoopwhoop.com/wp-content/uploads/2022/08/fefa830f-f75f-44a7-ade3-25e4d1a2318c.jpg",
		videos: "4 videos",
		link: "/show/fiq/?ref=watch_shows",
	},
	{
		title: "Specials",
		image:
			"https://wp.scoopwhoop.com/wp-content/uploads/2022/08/6815ca18-d931-4fbc-8c5c-717c2f328912.jpg",
		videos: "8 videos",
		link: "/show/special/?ref=watch_shows",
	},
	{
		title: "FIQ",
		image:
			"https://wp.scoopwhoop.com/wp-content/uploads/2022/08/fefa830f-f75f-44a7-ade3-25e4d1a2318c.jpg",
		videos: "4 videos",
		link: "/show/fiq/?ref=watch_shows",
	},
	{
		title: "Specials",
		image:
			"https://wp.scoopwhoop.com/wp-content/uploads/2022/08/6815ca18-d931-4fbc-8c5c-717c2f328912.jpg",
		videos: "8 videos",
		link: "/show/special/?ref=watch_shows",
	},
	{
		title: "FIQ",
		image:
			"https://wp.scoopwhoop.com/wp-content/uploads/2022/08/fefa830f-f75f-44a7-ade3-25e4d1a2318c.jpg",
		videos: "4 videos",
		link: "/show/fiq/?ref=watch_shows",
	},
	{
		title: "Specials",
		image:
			"https://wp.scoopwhoop.com/wp-content/uploads/2022/08/6815ca18-d931-4fbc-8c5c-717c2f328912.jpg",
		videos: "8 videos",
		link: "/show/special/?ref=watch_shows",
	},
];
