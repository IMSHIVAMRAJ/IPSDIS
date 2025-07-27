import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const defaultImages = [
  "/Images/Banner 2024.jpg",
  "/Images/banner Nagpur.jpg",
  "/Images/Banner Tripura 2024.jpg",
  "/Images/books.jpg",
  "/Images/IPS publications 2.jpg",
  "/Images/MEZ  Banner 2024-25.jpg",
  "/Images/Banner 2024.jpg",
  "/Images/banner Nagpur.jpg",
  "/Images/Banner Tripura 2024.jpg",
  "/Images/books.jpg",
  "/Images/IPS publications 2.jpg",
  "/Images/MEZ  Banner 2024-25.jpg",
];

function Carousel({ images, showArrows = false, height = 400 }) {
  const imgs = images && images.length > 0 ? images : defaultImages;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [current, imgs.length]);

  // Animation state reset
  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => setAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  const handleNext = () => {
    setAnimating(true);
    setCurrent((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ height }}>
        {showArrows && (
          <button
            onClick={() => {
              setAnimating(true);
              setCurrent((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
            }}
            className="absolute left-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg text-2xl top-1/2 -translate-y-1/2"
            style={{ color: '#0d6e50' }}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
        )}
        <div className="w-full h-full flex items-center justify-center relative">
          <img
            src={imgs[current]}
            alt={`Publication ${current + 1}`}
            className={`w-full h-full object-cover cursor-pointer transition-transform duration-500 ease-in-out ${
              animating ? "translate-x-0 animate-slide-in-left" : "translate-x-0"
            }`}
            onClick={handleNext}
            style={{ border: 'none', boxShadow: 'none' }}
          />
        </div>
        {showArrows && (
          <button
            onClick={handleNext}
            className="absolute right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg text-2xl top-1/2 -translate-y-1/2"
            style={{ color: '#0d6e50' }}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        )}
        {/* Image indicators over image at bottom center, no background */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center gap-2">
          {imgs.map((_, idx) => (
            <span
              key={idx}
              className={`text-2xl cursor-pointer select-none transition-colors duration-200`}
              style={{ color: idx === current ? '#b2dfdb' : 'white', opacity: idx === current ? 1 : 0.6 }}
              onClick={() => {
                setAnimating(true);
                setCurrent(idx);
              }}
            >
              _
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel; 