"use client";
import { FaCheck } from "react-icons/fa6";

const page = () => {
	return (
		<div>
			<div className='bg-gray-600 max-w-[500px] mx-auto rounded-md mt-20 px-3 py-8'>
				<p className='font-semibold text-xl text-center'>
					Congratulations! Your post has been successfully updated and
					published.
				</p>
				<div className='flex justify-center pt-6'>
					<FaCheck className='text-4xl text-green-300' />
				</div>
			</div>
		</div>
	);
};

export default page;
