import InfoWrapper from "@/components/posts/InfoWrapper";

const page = () => {
	return (
		<InfoWrapper>
			<div className='max-w-3xl mx-auto p-6 dark:text-gray-200'>
				<h1 className='text-3xl font-bold mb-4'>About Us</h1>
				<p className='mb-4'>
					<strong>Sozoo Today</strong> is a byte-sized media platform,
					delivering fast and digestible news since 2021. Covering global
					affairs, politics, business, technology, and entertainment, it makes
					news accessible and engaging for modern audiences who prefer concise
					yet informative updates.
				</p>
				<p className='mb-4'>
					Reaching millions of people every month, Sozoo Today has built a
					strong presence in modern digital media. It leverages social media and
					digital platforms to distribute news efficiently, ensuring audiences
					stay updated with key developments in real time.
				</p>
				<p className='mb-4'>
					Committed to accuracy and relevance, Sozoo Today curates news and
					essential information from verified sources, bringing you the updates
					that truly matter. Whether it’s breaking news or insightful analysis,
					the platform ensures that every piece of content is trustworthy and
					impactful.
				</p>
				<p className='mb-4'>
					The platform also extends its coverage through{" "}
					<strong>Sozoo Entertainment</strong>, a dedicated section focusing on
					pop culture and entertainment news, adding a fresh take on the stories
					people love. Fast, engaging, and to the point—that’s how Sozoo Today
					is changing the way people stay informed.
				</p>
			</div>
		</InfoWrapper>
	);
};

export default page;
