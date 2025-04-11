'use client';
import InfoWrapper from '@/components/posts/InfoWrapper';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCategoryPosts } from '@/utils/utils';
import PostsContainer from '@/components/posts/PostsContainer';

const page = () => {
  const pathName = usePathname().split('/')[1];
  const [posts, setPosts] = useState({
    data: [],
    status: 'loading',
  });

  useEffect(() => {
    getCategoryPosts(pathName, setPosts);
  }, []);

  return (
    <InfoWrapper>
      <PostsContainer posts={posts} path={pathName} />
    </InfoWrapper>
  );
};

export default page;
