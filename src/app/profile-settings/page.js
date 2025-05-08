"use client";

import { useSession } from "next-auth/react";
import { useState, useRef } from "react";

export default function ProfilePage() {
	const { data: session, update } = useSession();
	const user = session?.user;
	const [showModal, setShowModal] = useState(false);
	const imageInputRef = useRef(null);

	const [formData, setFormData] = useState({
		name: user?.name || "",
		username: user?.username || "",
		interests: user?.interests || [],
		notificationsEnabled: user?.notificationsEnabled || false,
		image: null, // File object
		imagePreview: user?.image || "",
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === "checkbox") {
			setFormData({ ...formData, [name]: checked });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData({
				...formData,
				image: file,
				imagePreview: URL.createObjectURL(file),
			});
		}
	};

	const handleUpdate = async () => {
		const data = new FormData();
		data.append("name", formData.name);
		data.append("username", formData.username);
		data.append("notificationsEnabled", formData.notificationsEnabled);
		formData.interests.forEach((interest) =>
			data.append("interests[]", interest)
		);
		if (formData.image) {
			data.append("image", formData.image);
		}

		const res = await fetch("/api/profile/update", {
			method: "PUT",
			body: data,
		});

		if (res.ok) {
			setShowModal(false);
			await update(); // Refresh session
		} else {
			const errorText = await res.text();
			alert("Error: " + errorText);
		}
	};

	if (!user) return <p className='text-center mt-10'>Loading...</p>;

	return (
		<div className='min-h-screen flex items-center justify-center bg-background px-4'>
			<div className='bg-card text-card-foreground shadow-xl rounded-2xl p-8 max-w-md w-full text-center'>
				<div className='flex justify-center mb-4'>
					<img
						src={user.image || "/default-avatar.png"}
						alt='Profile'
						className='w-24 h-24 rounded-full border-4 border-primary object-cover'
					/>
				</div>
				<h1 className='text-2xl font-semibold'>{user.name}</h1>
				<p className='text-muted-foreground text-sm'>{user.email}</p>
				<p className='text-muted-foreground text-sm'>
					@{user.username || "username"}
				</p>
				<p className='text-sm mt-2'>
					<span className='font-medium text-primary'>Points:</span>{" "}
					{user.points || 0}
				</p>
				<button
					onClick={() => setShowModal(true)}
					className='mt-4 px-5 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90'
				>
					Edit Profile
				</button>
			</div>

			{showModal && (
				<div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
					<div className='relative bg-card text-card-foreground p-6 rounded-xl w-full max-w-md shadow-xl'>
						<h2 className='text-lg font-semibold mb-6'>Update Profile</h2>

						<div className='space-y-4'>
							<input
								name='name'
								value={formData.name}
								onChange={handleChange}
								placeholder='Full Name'
								className='w-full p-3 rounded-md border bg-input text-foreground border-border'
							/>
							<input
								name='username'
								value={formData.username}
								onChange={handleChange}
								placeholder='Username'
								className='w-full p-3 rounded-md border bg-input text-foreground border-border'
							/>

							{/* Image upload */}
							<div>
								<label className='block mb-1 font-medium'>Profile Image</label>
								<input
									ref={imageInputRef}
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									className='block w-full text-sm text-muted-foreground'
								/>
								{formData.imagePreview && (
									<img
										src={formData.imagePreview}
										alt='Preview'
										className='mt-2 w-20 h-20 rounded-full object-cover border'
									/>
								)}
							</div>

							{/* Notifications */}
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									name='notificationsEnabled'
									checked={formData.notificationsEnabled}
									onChange={handleChange}
								/>
								<span>Enable Notifications</span>
							</label>
						</div>

						<div className='flex justify-end gap-3 mt-6'>
							<button
								onClick={() => setShowModal(false)}
								className='px-4 py-2 rounded-md bg-muted text-muted-foreground hover:opacity-90'
							>
								Cancel
							</button>
							<button
								onClick={handleUpdate}
								className='px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90'
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
