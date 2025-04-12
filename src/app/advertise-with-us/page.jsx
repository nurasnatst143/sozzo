import InfoWrapper from "@/components/posts/InfoWrapper";

const page = () => {
	return (
		<InfoWrapper>
			<div className='max-w-3xl mx-auto p-6 dark:text-gray-200'>
				<h1 className='text-3xl font-bold mb-4'>Advertise with Us</h1>
				<p className='mb-4'>
					<strong>Make your brand unforgettable.</strong> Reach a wide, engaged
					audience with ads that stand out.
				</p>
				<p className='mb-4'>
					<strong>Get in touch:</strong>
					<br />
					<a
						href='mailto:ads@sozootoday.com'
						className='text-blue-500 underline'
					>
						ads@sozootoday.com
					</a>
				</p>
			</div>
		</InfoWrapper>
	);
};

export default page;
