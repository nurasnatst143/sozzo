import InfoWrapper from "@/components/posts/InfoWrapper";

const page = () => {
	return (
		<InfoWrapper>
			<div className='max-w-3xl mx-auto p-6 dark:text-gray-200'>
				<h1 className='text-3xl font-bold mb-4'>Terms and Conditions</h1>
				<p className='mb-4'>
					Welcome to <strong>Sozoo Today</strong>. By accessing or using our
					website (
					<a
						href='https://www.sozootoday.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-blue-500 underline'
					>
						https://www.sozootoday.com
					</a>
					), you agree to these Terms and Conditions. If you do not agree with
					any part of these terms, please refrain from using our website.
				</p>
				<p className='mb-4'>
					Sozoo Today provides quick, reliable, and digestible news updates
					sourced from verified sources. While we strive for accuracy, we cannot
					guarantee that all information will always be error-free or up to
					date. We reserve the right to modify, update, or remove content at any
					time without prior notice.
				</p>
				<p className='mb-4'>
					You are welcome to share our content with proper credit. However, all
					content—including news articles, images, graphics, and videos—remains
					the property of Sozoo Today and may not be reproduced, modified, or
					distributed without permission. Any user-generated content, such as
					comments or submissions, grants Sozoo Today a non-exclusive,
					royalty-free license to use, display, or remove it if it violates our
					guidelines.
				</p>
				<p className='mb-4'>
					Our website may contain links to third-party websites for reference.
					Sozoo Today is not responsible for the content, privacy policies, or
					practices of external sites. Users should exercise discretion when
					accessing third-party links.
				</p>
				<p className='mb-4'>
					By using our website, you acknowledge that Sozoo Today is not liable
					for any direct or indirect loss or damage resulting from the use of
					our content. If any changes are made to these Terms and Conditions,
					continued use of the website implies acceptance of the updated terms.
				</p>
				<p className='mb-4'>
					For any inquiries, please contact us at{" "}
					<a
						href='mailto:connect@sozootoday.com'
						className='text-blue-500 underline'
					>
						connect@sozootoday.com
					</a>
					.
				</p>
			</div>
		</InfoWrapper>
	);
};

export default page;
