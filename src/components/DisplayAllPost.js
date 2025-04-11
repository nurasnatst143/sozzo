'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts } from '@/utils/utils';
import DisplayPostInfo from './posts/DisplayPostInfo';

const DisplayAllPost = () => {
  const [posts, setPosts] = useState({
    data: [],
    status: 'idle',
  });


  useEffect(() => {
    getPosts(setPosts);
  }, []);

  if (posts.status === 'loading') {
    return (
      <div className="text-center font-bold text-2xl py-10 min-h-[80vh]">
        Loading....
      </div>
    );
  }

  return posts.data.length ? (
    posts.data.map(item => (
      <Link href={`posts/${item._id}`} key={item._id}>
        <DisplayPostInfo news={item} />
      </Link>
    ))
  ) : (
    <div className="text-center font-bold text-2xl py-10 min-h-[80vh]">
      No Post To Show
    </div>
  );
};

export default DisplayAllPost;
