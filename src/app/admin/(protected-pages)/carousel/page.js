import ShowData from '@/components/Carousel/ShowData';
import Link from 'next/link';

const page = () => {
  return (
    <div>
      <div className="flex justify-end px-2 py-2">
        <Link
          href="/admin/carousel/add-item"
          className="bg-white text-black rounded-full px-6 py-2 capitalize font-semibold"
        >
          Add Item
        </Link>
      </div>
      <ShowData />
    </div>
  );
};

export default page;
