"use client";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { IoMdMail, IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa6";

const Page = () => {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setCredentials((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (error.name || error.password || error.email) {
			return;
		}
		try {
			setIsLoading(true);
			const res = await axios.post("/api/sign-up", credentials);
			if (res.status === 200) {
				router.push("/sign-up/email-confirmation");
			}
		} catch (err) {
			console.error("Signup error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<Nav />

			<div className='relative  w-full bg-background bg-no-repeat bg-center bg-cover flex justify-center pt-14 pb-32 px-2 '>
				<div className='bg-black/20 backdrop-blur-md  shadow-md border border-white/20 mx-auto p-4 pb-8 w-full md:w-[35vw] min-w-[300px] rounded-md'>
					<h1 className='text-center text-white text-2xl font-bold px-2 py-3'>
						Sign Up
					</h1>
					<form className='w-full max-w-md m-auto' onSubmit={handleSubmit}>
						<input
							type='text'
							id='name'
							name='name'
							className='w-full rounded-full border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 text-primary placeholder:text-white mb-3'
							value={credentials.name}
							onChange={handleChange}
							placeholder='Name'
							required
						/>

						<div className='relative mb-3'>
							<IoMdMail className='absolute right-3 top-3 z-10 text-white' />
							<input
								type='text'
								id='email'
								name='email'
								className='w-full rounded-full border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 placeholder:text-white'
								onChange={handleChange}
								value={credentials.email}
								placeholder='email'
								required
							/>
						</div>

						<div className='relative mb-8'>
							<FaLock className='absolute right-3 top-3 z-10 text-white' />
							<input
								type='password'
								name='password'
								id='password'
								className='w-full rounded-full border-white bg-transparent focus:outline-none focus:border-white focus:ring-0 placeholder:text-white '
								onChange={handleChange}
								value={credentials.password}
								placeholder='Password'
								required
							/>
						</div>

						<div className='flex justify-end'>
							<button
								type='submit'
								disabled={isLoading}
								className='capitalize w-full bg-primary px-4 py-2 rounded-full text-lg text-background font-semibold hover:bg-gray-200 hover:text-gray-800 transition duration-300 focus:outline-none disabled:opacity-60 flex justify-center items-center gap-2'
							>
								{isLoading ? (
									<span className='w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin'></span>
								) : (
									"Sign up"
								)}
							</button>
						</div>
					</form>
					<div className='w-full max-w-md m-auto'>
						<div className='flex mx-auto my-2 w-full'>
							<button
								type='button'
								disabled={isLoading}
								className='capitalize w-full bg-primary px-4 py-2 rounded-full text-md md:text-lg text-background font-semibold hover:bg-gray-200 hover:text-gray-800 transition duration-300 focus:outline-none disabled:opacity-60 flex justify-center items-center gap-2'
							>
								<AiOutlineGoogle className='text-3xl text-green-500' /> Continue
								with Google
							</button>
						</div>

						<div className='flex mx-auto w-full text-white mt-2'>
							<p className='text-md w-full text-center'>
								Already have account?{" "}
								<Link href='/login' className='font-bold'>
									Sign in
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Page;
