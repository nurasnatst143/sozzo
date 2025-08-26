"use client";
import { useState, useEffect } from "react";
import DropdownSelect from "./DropdownSelect";
import ImageUploadInput from "./ImageUploadInput";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
	loading: () => <p>Loading...</p>,
});

const CreatePostForm = () => {
	const [mounted, setMounted] = useState(false);
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		setMounted(true);
	}, []);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "business",
		image: "",
		featured: false,
		viralPost: false,
	});

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
	const handleChange = (e) => {
		setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
	};
	const handleCheckboxChange = (e) => {
		setFormData((data) => ({ ...data, [e.target.name]: !data[e.target.name] }));
	};
	const handleSelect = (option) => {
		setFormData((data) => ({ ...data, category: option }));
	};

	return (
		mounted && (
			<div>
				<h1 className='text-xl font-bold text-center py-9 border-b border-amber-500'>
					Create New Post
				</h1>
				<div className='px-5 py-6'>
					<form
						action='/api/posts/add'
						method='POST'
						encType='multipart/form-data'
					>
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
								type='text'
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
								onChange={(event) => {
									console.log("Description changed:", event);

									setFormData((state) => ({
										...state,
										description: event,
									}));
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
						<div>
							<ImageUploadInput formData={formData} setFormData={setFormData} />
						</div>
						<div className='flex items-center gap-2 pt-3'>
							<input
								type='checkbox'
								id='featured'
								name='featured'
								value={formData.featured}
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
								value={formData.viralPost}
								checked={formData.viralPost}
								onChange={handleCheckboxChange}
								className='rounded border-gray-300 text-pink-500 focus:ring-pink-500'
							/>
							<label htmlFor='viralPost'>Viral Topic</label>
						</div>

						<div className='flex justify-end'>
							<button
								type='submit'
								className='bg-green-300 px-6 py-2 font-semibold text-lg rounded-md'
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default CreatePostForm;
