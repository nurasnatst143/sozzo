"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [message, setMessage] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch("/api/auth/verify-code", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, code }),
		});

		const data = await res.json();
		if (res.ok) {
			router.push(`/reset-password?email=${email}&code=${code}`);
		} else {
			setMessage(data.error);
		}
	};

	return (
		<div
			className={`min-h-screen flex items-center justify-center bg-[url('/assets/bg.jpg')] bg-no-repeat bg-center bg-cover px-4`}
		>
			<div className='w-full max-w-md bg-black/20 backdrop-blur-md shadow-lg rounded-2xl p-8 space-y-6 border border-neutral'>
				<h1 className='text-2xl font-semibold text-center text-primary'>
					Verify Reset Code
				</h1>
				<p className='text-sm text-center '>
					Check your email and enter the 6-digit code
				</p>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='email'
						required
						placeholder='Your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary'
					/>
					<input
						type='text'
						required
						placeholder='6-digit code'
						value={code}
						onChange={(e) => setCode(e.target.value)}
						className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary'
					/>
					<button
						type='submit'
						className='w-full bg-sky text-white py-2 rounded-lg hover:bg-sky-400 transition'
					>
						Verify Code
					</button>
				</form>

				{message && <p className='text-center text-sm text-error'>{message}</p>}
			</div>
		</div>
	);
}
