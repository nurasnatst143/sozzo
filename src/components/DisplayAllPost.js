"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DisplayPostInfo from "./posts/DisplayPostInfo";
import { getPosts } from "@/utils/utils";

const DisplayAllPost = () => {
	const [posts, setPosts] = useState([]);
	const [status, setStatus] = useState("idle");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 20;

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setStatus("loading");
				const data = await getPosts(page, limit);
				setPosts(data.posts || []);
				setTotalPages(data.pagination?.totalPages || 1);
				setStatus("idle");
			} catch (err) {
				setStatus("idle");
			}
		};

		fetchPosts();
	}, [page]);

	const goToPage = (pageNum) => {
		if (pageNum !== page) setPage(pageNum);
	};

	const renderPageNumbers = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<button
					key={i}
					onClick={() => goToPage(i)}
					className={`px-3 py-1 rounded border ${
						page === i
							? "bg-gray-800 text-white"
							: "bg-white text-gray-800 hover:bg-gray-200"
					}`}
				>
					{i}
				</button>
			);
		}
		return pages;
	};

	if (status === "loading") {
		return (
			<div className='text-center font-bold text-2xl py-10 min-h-[80vh]'>
				Loading...
			</div>
		);
	}

	return (
		<div className='py-10'>
			{posts.length ? (
				<>
					<div className=' '>
						{posts.map((item) => (
							<DisplayPostInfo key={item._id} news={item} />
						))}
					</div>

					{/* Pagination Controls */}
					<div className='flex justify-center flex-wrap gap-2 mt-10'>
						<button
							onClick={() => goToPage(page - 1)}
							disabled={page === 1}
							className='px-4 py-2 border rounded bg-white text-gray-800 disabled:opacity-50'
						>
							Previous
						</button>

						{renderPageNumbers()}

						<button
							onClick={() => goToPage(page + 1)}
							disabled={page === totalPages}
							className='px-4 py-2 border rounded bg-white text-gray-800 disabled:opacity-50'
						>
							Next
						</button>
					</div>
				</>
			) : (
				<div className='text-center font-bold text-2xl py-10 min-h-[80vh]'>
					No Post To Show
				</div>
			)}
		</div>
	);
};

export default DisplayAllPost;
