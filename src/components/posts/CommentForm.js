"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

function CommentForm({ news, messageForm, setMessageForm }) {
	let [comments, setComments] = useState(news?.comments || []);
	const [newComment, setNewComment] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await axios.post("/api/posts/comment", {
			message: newComment,
			id: news._id,
		});
		const commentsres = res.data.comment;
		setComments((x) => [commentsres, ...x]);
		setNewComment("");
		setMessageForm(false);
	};

	return (
		<div className=' bg-sky-100 dark:bg-gray-700 rounded-lg border px-3 py-6 my-4 mx-6'>
			<h3 className='font-bold'>Discussion</h3>
			{messageForm && (
				<form onSubmit={handleSubmit}>
					<div className='w-full px-3 my-2'>
						<textarea
							className='  rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none bg-background'
							name='body'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder='Type Your Comment'
							required
						></textarea>
					</div>
					<div className='w-full flex justify-end px-3'>
						<button
							type='submit'
							className='px-2.5 py-1.5 rounded-md text-sm bg-green-400'
						>
							Submit
						</button>
					</div>
				</form>
			)}
			{comments.length ? (
				<div className='flex flex-col'>
					{comments.map((item, i) => (
						<div
							className='border rounded-md p-3 ml-3 my-3'
							key={item?._id + i}
						>
							<div className='flex gap-3 items-center'>
								<Image
									src={item?.avatar}
									width={48}
									height={48}
									className='rounded-full'
									alt={item?.name}
								/>
								<h3 className='font-bold'>{item?.name}</h3>
							</div>
							<p className=' mt-2'>{item?.text}</p>
						</div>
					))}
				</div>
			) : (
				<div>
					<p className=' text-xl font-semibold text-center pb-5'>
						No Comment To Display
					</p>
				</div>
			)}
		</div>
	);
}

export default CommentForm;
