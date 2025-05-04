"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);

		try {
			const res = await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Failed to send reset code");
			}

			setMessage("If the email is registered, a reset code has been sent.");
			router.push("/verify-code");
		} catch (err) {
			setMessage(err.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-background px-4'>
			<div className='w-full max-w-md bg-background shadow-lg rounded-2xl p-8 space-y-6 border border-neutral'>
				<h1 className='text-2xl font-semibold text-center text-primary'>
					Forgot Password
				</h1>
				<p className='text-sm text-center'>
					Enter your email and we’ll send you a reset code.
				</p>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700'
						>
							Email Address
						</label>
						<input
							type='email'
							id='email'
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary'
							placeholder='you@example.com'
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='w-full bg-sky text-white py-2 rounded-lg hover:bg-sky-400 transition disabled:opacity-60 disabled:cursor-not-allowed'
					>
						{loading ? "Sending..." : "Send Reset Code"}
					</button>
				</form>

				{message && <p className='text-sm text-center text-info'>{message}</p>}

				<div className='text-center'>
					<a href='/login' className='text-sm  hover:underline'>
						Back to Login
					</a>
				</div>
			</div>
		</div>
	);
}
