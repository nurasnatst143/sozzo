// app/page.tsx or wherever your Home component is
import ConditionalRender from "@/components/ConditionalRender";
import Footer from "@/components/Footer";
import Nav from "@/components/nav/Nav";
import MarqueeContainer from "@/components/marquee/MarqueeContainer";
import CurrentDate from "@/components/CurrentDate";
import FeaturedPosts from "@/components/FeaturedPosts";

import { getHomeScreenSaver } from "@/lib/home-screen-saver";
import { getCarouselData } from "@/lib/carousel";
import { getHeadlinePosts } from "@/lib/headline";
import { getFeaturedPosts } from "@/lib/featured-posts";

export default async function Home() {
	const [screenSaverDoc, slidedata, headlines, featuredPosts] =
		await Promise.all([
			getHomeScreenSaver(),
			getCarouselData(),
			getHeadlinePosts(),
			getFeaturedPosts(),
		]);
	console.log(
		"featuredPosts",
		typeof screenSaverDoc,
		typeof slidedata,
		typeof headlines,
		typeof featuredPosts
	);

	return (
		<main>
			<Nav />
			<div className='relative h-screen'>
				<ConditionalRender
					videoUrl={screenSaverDoc?.url}
					slidedata={slidedata}
				/>
				<MarqueeContainer headlines={headlines} />
			</div>
			<div className='bg-sky-50 dark:bg-black'>
				<div className='relative'>
					<CurrentDate />
				</div>
				<FeaturedPosts posts={featuredPosts} />
			</div>
			<Footer />
		</main>
	);
}
