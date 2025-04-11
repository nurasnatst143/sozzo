'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import InfoWrapper from '@/components/posts/InfoWrapper';
import { FaCheck } from 'react-icons/fa6';

const page = () => {
  const [state, setState] = useState({
    isVerified: false,
    status: 'loading',
  });
  const pathName = usePathname().split('/')[2];

  const verifyUser = async () => {
    const res = await axios.get('/api/sign-up', {
      headers: {
        Id: pathName,
      },
    });

    if (res.status === 200) {
      setState({ ...state, isVerified: true, status: 'idle' });
    } else {
      setState({ ...state, status: 'idle' });
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <InfoWrapper>
      <div className="min-h-[80vh] flex justify-center items-center">
        {state.status === 'loading' ? (
          <p className="text-2xl font-semibold">Processing...</p>
        ) : state.isVerified ? (
          <div className="max-w-[500px] px-5 py-8 bg-gray-700 rounded-md">
            <p className="text-xl font-semibold text-center">
              Thank you for joining us. Your account has been successfully
              created. We're excited to have you on board! Explore and enjoy
            </p>
            <div className="flex justify-center pt-6">
              <FaCheck className="text-4xl text-green-300" />
            </div>
          </div>
        ) : (
          <p className="text-2xl font-semibold">Something Went Wrong</p>
        )}
      </div>
    </InfoWrapper>
  );
};

export default page;
