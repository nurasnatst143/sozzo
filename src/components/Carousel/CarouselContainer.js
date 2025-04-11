'use client';
import { useReducer, useEffect, useState } from 'react';
import Slides from './Slides';
import Slide from './Slide';
import carouselReducer from './carouselReducer';
import SlideNav from './SlideNav';
import SlideNavItem from './SlideNavItem';
import { getCarouselData } from '@/utils/utils';

const CarouselContainer = () => {
  const [slideData, setSlideData] = useState({
    data: [],
    status: 'loading',
  });
  const SLIDE_DURATION = 10000;
  const [state, dispatch] = useReducer(carouselReducer, {
    currentIndex: 0,
    isPlaying: true,
    takeFocus: false,
  });
  useEffect(() => {
    if (state.isPlaying) {
      let timeout = setTimeout(() => {
        dispatch({ type: 'PROGRESS', length: slideData.data.length });
      }, SLIDE_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [state.currentIndex, state.isPlaying, slideData.data]);

  useEffect(() => {
    if (state.takeFocus) {
      dispatch({ type: 'UNSET_FOCUS' });
    }
  }, [state.takeFocus]);

  useEffect(() => {
    getCarouselData(setSlideData);
  }, []);

  if (slideData.status === 'loading') {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 h-screen">
        <div className="flex h-screen flex-row items-center justify-center text-xl font-semibold bg-gray-200">
          Loading....
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-screen">
      {slideData.data.length ? (
        <Slides>
          {slideData.data.map((data, index) => (
            <Slide
              key={index}
              id={`image-${index}`}
              image={data.image}
              title={data.description}
              isCurrent={index === state.currentIndex}
              takeFocus={state.takeFocus}
            />
          ))}
          <SlideNav>
            {slideData.data.map((slide, index) => (
              <SlideNavItem
                key={index}
                isCurrent={index === state.currentIndex}
                aria-label={`Slide ${index + 1}`}
                onClick={() => {
                  dispatch({ type: 'GOTO', index });
                }}
              />
            ))}
          </SlideNav>
        </Slides>
      ) : (
        <div className="flex h-screen flex-row items-center justify-center text-xl font-semibold bg-gray-200">
          No slides To Display
        </div>
      )}
    </div>
  );
};

export default CarouselContainer;
