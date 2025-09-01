"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 👈 add this
import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa6";

const AdminLoginForm = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!credentials.email || !credentials.password) return;
		setLoading(true);
		try {
			const res = await signIn("credentials", {
				...credentials,
				redirect: false,
			});
			if (res.ok) {
				// read session (includes user.role from your callbacks)
				const session = await fetch("/api/auth/session").then((r) => r.json());
				const role = session?.user?.role;

				// route by role
				router.replace(
					role === "admin" || role === "subadmin" ? "/admin" : "/"
				);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<form
			className='w-full max-w-md mx-auto flex flex-col gap-8'
			onSubmit={handleSubmit}
		>
			<div className='relative'>
				<IoMdPerson className='absolute right-2 top-2 z-10 text-white' />
				<input
					type='text'
					id='email'
					name='email'
					disabled={loading}
					className='w-full rounded-full border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 placeholder:text-white'
					onChange={handleChange}
					placeholder='email'
					required
				/>
			</div>

			<div className='relative'>
				<FaLock className='absolute right-2 top-2 z-10 text-white' />
				<input
					type='password'
					id='password'
					name='password'
					disabled={loading}
					className='w-full rounded-full border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 placeholder:text-white'
					onChange={handleChange}
					placeholder='Password'
					required
				/>
			</div>

			{/* remember + forgot row */}
			<div className='flex items-center justify-between text-sm'>
				<label
					className='relative flex cursor-pointer items-center rounded-full'
					htmlFor='remember'
				>
					<input
						type='checkbox'
						id='remember'
						disabled={loading}
						className='peer relative h-4 w-4 cursor-pointer appearance-none rounded border-2 border-white checked:outline-none'
					/>
					<div className='pointer-events-none text-primary absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 opacity-0 transition-opacity peer-checked:opacity-100'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-3 w-3'
							viewBox='0 0 20 20'
							fill='currentColor'
							stroke='currentColor'
							strokeWidth='1'
						>
							<path
								fillRule='evenodd'
								d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
					<p className='absolute top-2 left-5 -translate-y-2/4 text-primary w-[120px]'>
						Remember me
					</p>
				</label>

				{/* 👇 Forgot password link */}
				<Link
					href='/forgot-password'
					className='text-primary hover:underline focus:underline'
					aria-label='Forgot password'
				>
					Forgot password?
				</Link>
			</div>

			<div className='flex mx-auto w-full'>
				<button
					type='submit'
					disabled={loading}
					className='capitalize w-full bg-primary px-4 py-2 rounded-full text-lg text-background font-semibold hover:bg-gray-200 hover:text-gray-800 transition duration-300 focus:outline-none flex items-center justify-center gap-2'
				>
					{loading ? (
						<span className='animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full'></span>
					) : (
						"login"
					)}
				</button>
			</div>
		</form>
	);
};

export default AdminLoginForm;
