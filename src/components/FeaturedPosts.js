"use client";

import Story from "./Story";

import Link from "next/link";

const FeaturedPosts = ({ posts }) => {
	return (
		<>
			{posts?.length ? (
				<div className='max-w-[1300px] mx-auto py-10'>
					<div className='pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
						{posts &&
							posts.length > 0 &&
							posts?.map((item) => <Story key={item._id} item={item} />)}
					</div>
					{posts && (
						<div className='flex justify-center pt-10'>
							<Link href={"/posts"}>
								<button className='bg-black dark:bg-background text-white dark:text-black px-5 py-2 text-xl rounded-md font-semibold'>
									View <span className='text-red-400'>More</span>
								</button>
							</Link>
						</div>
					)}
				</div>
			) : (
				<div className='text-center font-bold text-2xl py-10'>
					No Post To Show
				</div>
			)}
		</>
	);
};

export default FeaturedPosts;
