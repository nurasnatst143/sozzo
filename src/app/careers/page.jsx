import InfoWrapper from "@/components/posts/InfoWrapper";

const page = () => {
	return (
		<InfoWrapper>
			<div className='max-w-3xl mx-auto p-6 dark:text-gray-200'>
				<h1 className='text-3xl font-bold mb-4'>Careers at Sozoo Today</h1>
				<p className='mb-4'>
					Passionate about media, storytelling, or building the future of
					digital news in Bangladesh?
					<strong> Sozoo Today</strong> is always looking for creative minds,
					sharp thinkers, and driven individuals to join our team.
				</p>
				<p className='mb-4'>
					Whether you're a journalist, content creator, social media strategist,
					graphic designer, or tech enthusiast — we’d love to hear from you.
				</p>
				<p className='mb-4'>
					<strong>To apply or inquire about current openings:</strong>
					<br />
					Email:{" "}
					<a
						href='mailto:careers@sozootoday.com'
						className='text-blue-500 underline'
					>
						careers@sozootoday.com
					</a>
				</p>
				<h2 className='text-2xl font-semibold mt-6 mb-2'>Internships</h2>
				<p className='mb-4'>
					We offer internship opportunities throughout the year for students and
					fresh graduates looking to gain real-world experience in media and
					communication.
				</p>
				<h2 className='text-2xl font-semibold mt-6 mb-2'>Stay Updated</h2>
				<p className='mb-4'>
					Follow us on{" "}
					<a
						href='https://www.linkedin.com/company/sozootoday'
						target='_blank'
						rel='noopener noreferrer'
						className='text-blue-500 underline'
					>
						LinkedIn
					</a>{" "}
					for job postings and career updates.
				</p>
			</div>
		</InfoWrapper>
	);
};

export default page;
