"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getHeadlines } from "@/utils/utils";
import { MdDeleteForever } from "react-icons/md";

const Page = () => {
	const [headlines, setHeadlines] = useState({
		data: [],
		status: "loading",
	});

	useEffect(() => {
		getHeadlines(setHeadlines);
	}, []);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`/api/posts/headline/${id}`);
			toast.success("Headline removed successfully!");
			// Refresh list
			getHeadlines(setHeadlines);
		} catch (err) {
			console.error("Delete failed", err);
			toast.error("Failed to remove headline.");
		}
	};

	if (headlines.status === "loading")
		return (
			<div className='text-2xl font-bold text-center py-10'>Loading...</div>
		);

	return headlines.data.length ? (
		<div>
			{headlines.data.map((item) => (
				<div
					key={item._id}
					className='bg-gray-600 py-2 px-3 rounded-md my-2 text-white font-semibold flex justify-between items-center'
				>
					<span>{item.title}</span>
					<MdDeleteForever
						size={24}
						className='cursor-pointer text-red-400 hover:text-red-600'
						onClick={() => handleDelete(item.post)}
						title='Delete Headline'
					/>
				</div>
			))}
		</div>
	) : (
		<div className='text-center font-semibold text-xl py-10'>
			No Headline To Display
		</div>
	);
};

export default Page;
