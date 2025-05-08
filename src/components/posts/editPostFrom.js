"use client";
import { useState, useEffect } from "react";
import DropdownSelect from "./DropdownSelect";
import dynamic from "next/dynamic";
import ImageUploadInput from "./ImageUploadInput";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), {
	loading: () => <p>Loading...</p>,
});

const EditPostForm = ({ postId }) => {
	const [mounted, setMounted] = useState(false);
	const [categories, setCategories] = useState([]);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "business",
		image: "", // can be URL or File
		featured: false,
		viralPost: false,
	});
	const router = useRouter();
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch("/api/category");
				const data = await res.json();
				setCategories(data);
			} catch (err) {
				console.error("Failed to fetch categories:", err);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const res = await fetch(`/api/posts/${postId}`);
				const data = await res.json();
				console.log(data);

				setFormData({
					title: data?.post?.title || "",
					description: data?.post?.description || "",
					category: data?.post?.category || "business",
					image: data?.post?.image?.imageurl || "",
					featured: data?.post?.featured || false,
					viralPost: data?.post?.viralPost || false,
				});
			} catch (err) {
				console.error("Failed to fetch post:", err);
			}
		};

		if (postId) {
			fetchPost();
		}
		setMounted(true);
	}, [postId]);

	const handleChange = (e) => {
		setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
	};

	const handleCheckboxChange = (e) => {
		setFormData((data) => ({ ...data, [e.target.name]: !data[e.target.name] }));
	};

	const handleSelect = (option) => {
		setFormData((data) => ({ ...data, category: option }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = new FormData();
		form.append("title", formData.title);
		form.append("description", formData.description);
		form.append("category", formData.category);
		form.append("featured", formData.featured);
		form.append("viralPost", formData.viralPost);
		if (formData.image && formData.image instanceof File) {
			form.append("image", formData.image);
		} else {
			form.append("image", formData.image); // keep old URL or empty string
		}

		try {
			const res = await fetch(`/api/posts/${postId}`, {
				method: "PUT",
				body: form,
			});
			const data = await res.json();
			alert("Post updated successfully!");
			router.push("/admin/all-posts");
		} catch (err) {
			console.error("Error updating post:", err);
			alert("Failed to update post.");
		}
	};

	return (
		mounted && (
			<div>
				<h1 className='text-xl font-bold text-center py-9 border-b border-amber-500'>
					Edit Post
				</h1>
				<div className='px-5 py-6'>
					<form onSubmit={handleSubmit} encType='multipart/form-data'>
						<div>
							<label
								className='text-md font-semibold pb-1 block'
								htmlFor='title'
							>
								Title
							</label>
							<input
								type='text'
								id='title'
								className='input'
								name='title'
								value={formData.title}
								onChange={handleChange}
								placeholder='Title'
								required
							/>
						</div>

						<div>
							<label
								className='text-md font-semibold pb-1 block'
								htmlFor='description'
							>
								Description
							</label>
							<textarea
								id='description'
								className='hidden'
								name='description'
								value={formData.description}
								onChange={handleChange}
								rows={0}
								required
							/>
							<ReactQuill
								theme='snow'
								className='bg-card text-primary mb-3'
								value={formData.description}
								onChange={(value) => {
									setFormData((state) => ({ ...state, description: value }));
								}}
							/>
						</div>

						<div>
							<label
								className='text-md font-semibold pb-1 block'
								htmlFor='category'
							>
								Select Category
							</label>
							<DropdownSelect
								options={categories}
								selectedOption={formData.category}
								onSelect={handleSelect}
							/>
						</div>

						<ImageUploadInput formData={formData} setFormData={setFormData} />

						<div className='flex items-center gap-2 pt-3'>
							<input
								type='checkbox'
								id='featured'
								name='featured'
								checked={formData.featured}
								onChange={handleCheckboxChange}
								className='rounded border-gray-300 text-pink-500 focus:ring-pink-500'
							/>
							<label htmlFor='featured'>Featured post</label>
						</div>

						<div className='flex items-center gap-2 pt-3'>
							<input
								type='checkbox'
								id='viralPost'
								name='viralPost'
								checked={formData.viralPost}
								onChange={handleCheckboxChange}
								className='rounded border-gray-300 text-pink-500 focus:ring-pink-500'
							/>
							<label htmlFor='viralPost'>Viral Topic</label>
						</div>

						<div className='flex justify-end pt-6'>
							<button
								type='submit'
								className='bg-green-300 px-6 py-2 font-semibold text-lg rounded-md'
							>
								Update Post
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default EditPostForm;
