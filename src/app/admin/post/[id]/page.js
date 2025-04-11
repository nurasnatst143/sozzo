'use client';
import { useState, useEffect } from 'react';
import { getPost } from '@/utils/utils';
import { useParams } from 'next/navigation';

const page = () => {
  const [post, setPost] = useState({
    data: null,
    status: 'idle',
  });
  
  const params = useParams();

  useEffect(() => {
    getPost(setPost, params.id)
  }, []);

  return <div>this page show single posts</div>;
};

export default page;
