import ConditionalRender from "@/components/ConditionalRender";
import Footer from "@/components/Footer";
import Nav from "@/components/nav/Nav";
import MarqueeContainer from "@/components/marquee/MarqueeContainer";
import CurrentDate from "@/components/CurrentDate";
import FeaturedPosts from "@/components/FeaturedPosts";

export default function Home() {
	return (
		<main>
			<Nav />
			<div className='relative h-screen'>
				<ConditionalRender />
				<MarqueeContainer />
			</div>
			<div className='bg-sky-50 dark:bg-black'>
				<div className='relative'>
					<CurrentDate />
				</div>
				<FeaturedPosts />
			</div>
			<Footer />
		</main>
	);
}
