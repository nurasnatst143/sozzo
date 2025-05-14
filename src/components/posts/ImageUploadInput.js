const ImageUploadInput = ({ formData, setFormData }) => {
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prev) => ({
				...prev,
				image: file,
			}));
		}
	};

	const handleRemoveImage = () => {
		setFormData((prev) => ({
			...prev,
			image: "",
		}));
	};

	const isImageURL =
		typeof formData.image === "string" && formData.image !== "";

	return (
		<div className='my-4'>
			<label className='text-md font-semibold pb-1 block'>Image</label>

			{isImageURL && (
				<div className='mb-2'>
					<img
						src={formData.image}
						alt='Current'
						className='w-32 h-32 object-cover rounded mb-2 border'
					/>
					<button
						type='button'
						onClick={handleRemoveImage}
						className='text-sm text-red-600 underline'
					>
						Remove image
					</button>
				</div>
			)}

			<input
				name='image'
				type='file'
				accept='image/*'
				onChange={handleImageChange}
				className='block mt-2'
			/>
		</div>
	);
};

export default ImageUploadInput;
