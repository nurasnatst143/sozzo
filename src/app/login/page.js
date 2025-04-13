import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";

const page = () => {
	return (
		<div>
			<div className='w-full px-10 mx-auto bg-sky-600 dark:bg-gray-800'>
				<Nav />
			</div>
			<div className="relative h-screen w-full bg-[url('/assets/bg.jpg')] bg-no-repeat bg-center bg-cover">
				<div className=' w-[60vw] max-w-[1400px] mx-auto px-2 min-h-[80vh] flex justify-center items-center '>
					<div className='bg-black/20 backdrop-blur-md  mt-3 shadow-md border border-white/20 mx-auto p-8 min-w-[300px] rounded-md'>
						<h1 className='text-center text-white text-2xl font-bold pb-8'>
							Login
						</h1>
						<LoginForm />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default page;
