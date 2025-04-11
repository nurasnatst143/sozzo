'use client';
import Image from 'next/image';
import { TbHandClick } from 'react-icons/tb';
import Link from 'next/link';

const Story = ({ item }) => {
  return (
    <Link
      href={`/posts/${item._id}`}
      className="h-[450px] bg-gray-800 relative overflow-x-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          fill={true}
          alt={`story thumbnil ${item._id}`}
          src={item.image.imageurl}
        />
        <div className="absolute top-2  right-1 py-3 px-3 rounded-full bg-[#ffffff31] flex gap-2 justify-center items-center text-white">
          <TbHandClick /> <h1 className="capitalize">read more</h1>
        </div>
        <div className="z-10 opacity-0 bg-black absolute top-0 left-0 w-full h-full"></div>
      </div>
    </Link>
  );
};

export default Story;
