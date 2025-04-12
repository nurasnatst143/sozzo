"use client";

import { FaCheck } from "react-icons/fa6";

const Page = () => {
	return (
		<div>
			<div className='bg-gray-600 max-w-[500px] mx-auto rounded-md mt-20 px-3 py-8'>
				<p className='font-semibold text-xl text-center text-white'>
					Congratulations! Your screen saver video has been successfully
					uploaded.
				</p>
				<div className='flex justify-center pt-6'>
					<FaCheck className='text-4xl text-green-300' />
				</div>
			</div>
		</div>
	);
};

export default Page;
