"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
	const [videoFile, setVideoFile] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleVideoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setVideoFile(file);
			setVideoPreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!videoFile) return;

		setLoading(true);

		const formData = new FormData();
		formData.append("video", videoFile);

		try {
			const res = await fetch("/api/home-screen-saver", {
				method: "POST",
				body: formData,
			});

			if (res.ok) {
				router.push("/admin/home-screen-saver/add-item/success");
			} else {
				alert("Failed to upload video.");
			}
		} catch (err) {
			console.error(err);
			alert("Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1 className='text-xl font-bold text-center py-9 border-b border-amber-500'>
				Upload Home Screen Saver Video
			</h1>
			<div className='px-5 py-6'>
				<form onSubmit={handleSubmit}>
					<div className='mb-5'>
						<label htmlFor='video' className='text-md font-semibold pb-1 block'>
							Select Video (MP4, WebM, etc.)
						</label>
						<input
							type='file'
							accept='video/*'
							id='video'
							required
							onChange={handleVideoChange}
							className='w-full rounded-md text-black bg-background border px-3 py-2'
						/>
					</div>

					{videoPreview && (
						<div className='mb-5'>
							<p className='font-semibold mb-2'>Preview:</p>
							<video
								controls
								className='w-full max-w-xl border rounded-md shadow'
								src={videoPreview}
							/>
						</div>
					)}

					<div className='flex justify-end'>
						<button
							type='submit'
							disabled={loading}
							className='bg-green-300 px-6 py-2 font-semibold text-lg rounded-md'
						>
							{loading ? "Uploading..." : "Upload Video"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Page;
