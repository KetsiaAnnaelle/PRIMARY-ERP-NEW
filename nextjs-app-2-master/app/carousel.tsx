"use client"
// components/Carousel.js
import { useState, useEffect } from 'react';

const Carousel = () => {
  const items = [
    { src: '/img/carousel1.webp', alt: 'img1' },
    { src: '/img/carousel2.webp', alt: 'img2' },
    { src: '/img/carousel3.webp', alt: 'img3' },
    { src: '/img/carousel4.webp', alt: 'img4' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % items.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextItem = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };

  return (
    <div id="animation-carousel" className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {items.map((item, index) => (
          <div
            key={index}
            className={`duration-200 ease-linear absolute inset-0 transition-transform transform ${
              index === currentIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
            data-carousel-item={index === currentIndex ? 'active' : ''}
          >
            <img
              src={item.src}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={item.alt}
            />
          </div>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevItem}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextItem}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
