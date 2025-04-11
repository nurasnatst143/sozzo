'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdDeleteForever } from 'react-icons/md';
import { RiFileEditFill } from 'react-icons/ri';
import { GoHeading } from 'react-icons/go';
import Link from 'next/link';
import { getPosts, deletePost, handleHeadline } from '@/utils/utils';

const DisplayAllPosts = () => {
  const [posts, setPosts] = useState({
    data: [],
    status: 'idle',
  });

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  if (posts.status === 'loading') {
    return (
      <div className="text-center font-bold text-2xl py-5">Loading...</div>
    );
  }

  return (
    <div className="px-5">
      {posts.data.length ? (
        <div className="py-5">
          {posts.data.map(item => (
            <div
              key={item._id}
              className="grid grid-cols-5 gap-2 my-3 py-2 px-2 rounded-md bg-gray-400 "
            >
              <div className="flex justify-center items-center col-span-1">
                <Image
                  src={item.image.imageurl}
                  alt={`photos-${item.id}`}
                  width={100}
                  height={100}
                />
              </div>
              <div className="col-span-4 ">
                <h1 className="text-xl font-bold mb-2 text-black truncate">
                  {item.title}
                </h1>
                <div
                  className="truncate mb-2 text-black"
                  dangerouslySetInnerHTML={{
                    __html: item.description.replace(/ style="[^"]*"/g, '')
                    .match(/<p[^>]*>(.*?)<\/p>/)[1]
                  }}
                />
                <div className="text-2xl flex justify-end gap-2">
                  <div
                    className="bg-sky-500 px-2 py-2 rounded-full cursor-pointer"
                    onClick={() => handleHeadline(item._id)}
                  >
                    <GoHeading />
                  </div>
                  <Link
                    href={`/admin/show-posts/update/${item._id}`}
                    className="bg-green-500 px-2 py-2 rounded-full cursor-pointer"
                  >
                    <RiFileEditFill />
                  </Link>
                  <div
                    className="bg-red-500 px-2 py-2 rounded-full cursor-pointer"
                    onClick={() => deletePost(setPosts, item._id)}
                  >
                    <MdDeleteForever />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-2xl font-bold text-center py-5">
          No Post To Show
        </div>
      )}
    </div>
  );
};

export default DisplayAllPosts;
