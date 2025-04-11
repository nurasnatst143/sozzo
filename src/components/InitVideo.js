'use client';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
import { useState, useEffect } from 'react';

const InitVideo = ({ cb }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleVideoEnd = () => {
    cb(false);
  };
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-screen">
      <ReactPlayer
        url="https://res.cloudinary.com/doq0sfefc/video/upload/v1732474718/sozoo/gzsivvnc4av28h8hakwg.mp4"
        onEnded={handleVideoEnd}
        width="100%"
        height="100%"
        playing={true}
        controls={false}
        muted={true}
      />
    </div>
  );
};

export default InitVideo;
