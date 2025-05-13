"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!credentials.email || !credentials.password) {
			alert("Email and password are required");
			return;
		}
		setLoading(true);
		try {
			const res = await signIn("credentials", {
				...credentials,
				redirect: false,
			});
			if (res.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setCredentials((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			{" "}
			<form
				className='w-full max-w-[805px] mx-auto flex flex-col gap-3'
				onSubmit={handleSubmit}
			>
				<div className='relative'>
					<IoMdMail className='absolute right-3 top-3 z-10 text-white' />
					<input
						type='text'
						name='email'
						className='w-full rounded-full border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 placeholder:text-white'
						onChange={handleChange}
						placeholder='email'
						required
					/>
				</div>
				<div className='relative'>
					<FaLock className='absolute right-3 top-3 z-10 text-white' />
					<input
						type='password'
						name='password'
						className='w-full rounded-full border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 placeholder:text-white'
						onChange={handleChange}
						placeholder='Password'
						required
					/>
				</div>

				<div className='flex justify-between items-center'>
					<div>
						<label
							className='relative flex cursor-pointer items-center rounded-full text-sm'
							htmlFor='remember'
						>
							<input
								type='checkbox'
								id='remember'
								className='peer relative h-4 w-4 appearance-none rounded border-2 border-white cursor-pointer'
							/>
							<div className='pointer-events-none text-white absolute right-3 top-3 -translate-y-2/4 -translate-x-2/4 opacity-0 transition-opacity peer-checked:opacity-100'>
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
									></path>
								</svg>
							</div>
							<p className='absolute top-2 left-5 -translate-y-2/4 text-white w-[120px]'>
								Remember me
							</p>
						</label>
					</div>
					<Link href={"/forgot-password"}>
						<p className='text-sm text-white underline'>Forgot password?</p>
					</Link>
				</div>
				<div className='flex mx-auto w-full mt-8'>
					<button
						type='submit'
						disabled={loading}
						className='capitalize w-full bg-primary px-4 py-2 rounded-full text-md md:text-lg text-background font-semibold hover:bg-background border hover:text-white transition duration-300 focus:outline-none disabled:opacity-60'
					>
						login
					</button>
				</div>
			</form>
			<div className='w-full max-w-[805px] mx-auto flex flex-col gap-3 mt-3'>
				<div className='flex mx-auto w-full'>
					<button
						onClick={() => signIn("google", { callbackUrl: "/" })}
						disabled={loading}
						className='capitalize w-full bg-primary px-4 py-2 rounded-full text-md md:text-lg text-background font-semibold hover:bg-background border hover:text-white transition duration-300 focus:outline-none disabled:opacity-60 flex justify-center items-center gap-2'
					>
						<AiOutlineGoogle className='text-3xl text-green-500' /> Continue
						with google
					</button>
				</div>
				<div className='flex mx-auto w-full text-white'>
					<p className='text-md w-full text-center'>
						Don't have an account?{" "}
						<Link href='/sign-up' className='font-bold'>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
