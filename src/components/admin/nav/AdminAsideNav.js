"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminNav = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	useEffect(() => {
		if (status === "loading") return; // wait for session
		const role = session?.user?.role;

		// Allow only admin & subadmin
		const allowed = role === "admin" || role === "subadmin";

		// Avoid redirect loop on the login page itself
		if (!allowed && pathname !== "/admin/login") {
			router.replace("/admin/login");
		}
	}, [status, session, router, pathname]);
	return (
		<div className='flex flex-col items-center gap-2 py-5'>
			<Link
				href='/admin/create-post'
				className='text-lg capitalize font-semibold'
			>
				Add post
			</Link>
			<Link
				href='/admin/all-posts'
				className='text-lg capitalize font-semibold'
			>
				All posts
			</Link>
			<Link
				href='/admin/all-categories'
				className='text-lg capitalize font-semibold'
			>
				All categories
			</Link>
			{session.user.role === "admin" && (
				<Link
					href='/admin/sub-admins'
					className='text-lg capitalize font-semibold'
				>
					All Sub Admins
				</Link>
			)}
			<Link href='/admin/headline' className='text-lg capitalize font-semibold'>
				Headline
			</Link>
			<Link href='/admin/carousel' className='text-lg capitalize font-semibold'>
				Carousel
			</Link>
			<Link
				href='/admin/home-screen-saver'
				className='text-lg capitalize font-semibold'
			>
				Home screen saver
			</Link>
		</div>
	);
};

export default AdminNav;
