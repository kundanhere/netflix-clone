import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = ({ title, children }) => {
  const sliderRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  // mouse click listener for cards-sliding
  const slideLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
  };

  const slideRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
  };

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-xl font-semibold mb-4 md:text-2xl">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto no-scrollbar" ref={sliderRef}>
        {children}
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 left-5 md:left-24 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={slideLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-5 md:right-24 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={slideRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;
