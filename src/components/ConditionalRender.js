'use client';
import { useState } from 'react';
import InitVideo from './InitVideo';
import CarouselContainer from './Carousel/CarouselContainer';

const ConditionalRender = () => {
  const [displayVideo, setDisplayVideo] = useState(true);
  return displayVideo ? (
    <InitVideo cb={setDisplayVideo} />
  ) : (
    <CarouselContainer />
  );
};

export default ConditionalRender;
