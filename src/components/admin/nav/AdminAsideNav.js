import Link from "next/link";

const AdminNav = () => {
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
			<Link
				href='/admin/sub-admins'
				className='text-lg capitalize font-semibold'
			>
				All Sub Admins
			</Link>
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
