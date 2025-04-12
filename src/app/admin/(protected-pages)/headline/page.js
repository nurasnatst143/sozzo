'use client';
import { useState, useEffect } from 'react';
import { getHeadlines } from '@/utils/utils';

const page = () => {
  const [headlines, setHeadlines] = useState({
    data: [],
    status: 'loading',
  });

  useEffect(() => {
    getHeadlines(setHeadlines);
  }, []);

  if (headlines.status === 'loading')
    return (
      <div className="text-2xl font-bold text-center py-10">Loading...</div>
    );

  return headlines.data.length ? (
    <div>
      {headlines.data.map(item => (
        <div
          key={item._id}
          className="bg-gray-600 py-2 px-2 rounded-md my-2 text-white font-semibold"
        >
          {item.title}
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center font-semibold text-xl py10">
      No Headline To Display
    </div>
  );
};

export default page;
