import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";

const page = () => {
	return (
		<div>
			<Nav />

			<div
				className={`relative h-screen w-full bg-[url('/assets/bg.jpg')] bg-no-repeat bg-center bg-cover`}
			>
				<div className='  max-w-[1400px] mx-auto px-2 flex justify-center pt-10 '>
					<div className='bg-black/20 backdrop-blur-md  mt-3 shadow-md border border-white/20 mx-auto p-6 w-full md:w-[35vw] min-w-[300px] rounded-md'>
						<h1 className='text-center text-primary text-2xl font-bold pb-8'>
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
