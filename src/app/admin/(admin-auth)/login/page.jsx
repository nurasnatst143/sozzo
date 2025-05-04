import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import AdminLoginForm from "@/components/admin/auth/AdminLoginForm";

const page = () => {
	return (
		<div>
			<div className='w-full px-10 mx-auto bg-sky dark:bg-gray-800'>
				<Nav />
			</div>
			<div className='relative h-screen w-full bg-background bg-no-repeat bg-center bg-cover'>
				<div className='max-w-[1400px] mx-auto px-2 min-h-[80vh] flex justify-center items-center '>
					<div className='bg-black/20 backdrop-blur-md  shadow-md border border-white/20 mx-auto p-8 min-w-[500px] rounded-md'>
						<h1 className='text-center text-white text-2xl font-bold pb-8'>
							Admin Login
						</h1>
						<AdminLoginForm />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default page;
