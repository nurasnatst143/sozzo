'use client';
import { useState, useEffect } from 'react';
import Story from './Story';
import { getFeaturedPosts } from '@/utils/utils';
import Link from 'next/link';

const FeaturedPosts = () => {
  const [posts, setPosts] = useState({
    data: [],
    status: 'idle',
  });
  useEffect(() => {
    getFeaturedPosts(setPosts);
  }, []);

  if (posts.status === 'loading') {
    return (
      <div className="text-center font-bold text-2xl py-10">Loading...</div>
    );
  }

  return (
    <>
      {posts.data.length ? (
        <div className="max-w-[1300px] mx-auto py-10">
          <div className="pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.data.map(item => (
              <Story key={item._id} item={item} />
            ))}
          </div>
          {posts && (
            <div className="flex justify-center pt-10">
              <Link href={'/posts'}>
                <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-xl rounded-md font-semibold">
                  View <span className="text-red-400">More</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center font-bold text-2xl py-10">
          No Post To Show
        </div>
      )}
    </>
  );
};

export default FeaturedPosts;
