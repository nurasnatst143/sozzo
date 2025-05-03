"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const searchParams = useSearchParams();
	const email = searchParams.get("email");
	const code = searchParams.get("code");
	const router = useRouter();

	useEffect(() => {
		if (!email || !code) {
			setMessage("Missing code or email. Go back and verify.");
		}
	}, [email, code]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			setMessage("Passwords do not match.");
			return;
		}

		const res = await fetch("/api/auth/reset-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, code, newPassword }),
		});

		const data = await res.json();
		if (res.ok) {
			router.push("/login");
		} else {
			setMessage(data.error);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-background px-4'>
			<div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-neutral'>
				<h1 className='text-2xl font-semibold text-center text-primary'>
					Reset Password
				</h1>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='password'
						required
						placeholder='New password'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary'
					/>
					<input
						type='password'
						required
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary'
					/>
					<button
						type='submit'
						className='w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-400 transition'
					>
						Reset Password
					</button>
				</form>

				{message && <p className='text-center text-sm text-error'>{message}</p>}
			</div>
		</div>
	);
}
