import InfoWrapper from "@/components/posts/InfoWrapper";

const page = () => {
	return (
		<InfoWrapper>
			<div className='max-w-3xl mx-auto p-6 dark:text-gray-200'>
				<h1 className='text-3xl font-bold mb-4'>Contact Us</h1>
				<p className='mb-4'>
					We’re here to connect, collaborate, and communicate. Whether you're a
					reader with feedback, a brand seeking partnership, or a journalist
					with a story to share — feel free to reach out.
				</p>
				<p className='mb-4'>
					<strong>Email:</strong>{" "}
					<a
						href='mailto:contact@sozootoday.com'
						className='text-blue-500 underline'
					>
						contact@sozootoday.com
					</a>
				</p>
				<p className='mb-4'>
					We aim to respond to all messages within 1–2 business days.
				</p>
			</div>
		</InfoWrapper>
	);
};

export default page;
