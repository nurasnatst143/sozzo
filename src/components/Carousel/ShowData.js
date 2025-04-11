'use client';
import { useState, useEffect } from 'react';
import { getCarouselData } from '@/utils/utils';
import Image from 'next/image';
import { deleteCarouselData } from '@/utils/utils';

const ShowData = () => {
  const [state, setState] = useState({
    data: [],
    status: 'loading',
  });

  useEffect(() => {
    getCarouselData(setState);
  }, []);

  if (state.status === 'loading') {
    return (
      <div className="text-2xl font-bold text-center py-10">Loading...</div>
    );
  }

  const handleDelete = id => {};

  return state.data.length ? (
    <div>
      {state.data.map(item => (
        <div
          className="bg-sky-50 dark:bg-gray-600 sm:grid sm:grid-cols-8 gap-5 py-6 px-2 rounded-md my-2"
          key={item._id}
        >
          <div className="sm:col-span-1 mx-auto flex justify-center">
            <Image
              src={item.image.imageurl}
              width={100}
              height={100}
              alt={item._id}
            />
          </div>
          <div className="sm:col-span-7 px-2 text-black">
            <p className="text-md font-bold mb-1 text-black dark:text-gray-100 truncate">
              {item.description}
            </p>
            <div className="flex justify-end px-3 pt-5">
              <button
                className="bg-red-300 px-6 py-2 rounded-full text-gray-800"
                onClick={() => deleteCarouselData(item._id, setState)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center text-gray-200 font-semibold py-10 text-2xl">
      No Data To Display
    </div>
  );
};

export default ShowData;
