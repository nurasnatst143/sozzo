import ConditionalRender from '@/components/ConditionalRender';
import Footer from '@/components/Footer';
import Nav from '@/components/nav/Nav';
import MarqueeContainer from '@/components/marquee/MarqueeContainer';
import CurrentDate from '@/components/CurrentDate';
import FeaturedPosts from '@/components/FeaturedPosts';

export default function Home() {
  return (
    <main>
      <div className="relative h-screen">
        <div className="absolute z-[1000] top-0 left-0 max-w-screen w-full bg-sky-600/80 dark:bg-gray-800/80">
          <div className="max-w-[1400px] mx-auto">
            <Nav />
          </div>
        </div>
        <ConditionalRender />
        <MarqueeContainer />
      </div>
      <div className="bg-sky-50 dark:bg-black">
        <div className="relative">
          <CurrentDate />
        </div>
        <FeaturedPosts />
      </div>
      <Footer />
    </main>
  );
}
