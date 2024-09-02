import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useContentStore } from '../store/content.store';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ContentSlider = ({ category }) => {
  const sliderRef = useRef(null);
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const { contentType } = useContentStore();
  const formattedContentType = contentType === 'movie' ? 'Movies' : 'TV Shows';
  const formattedCategoryName = category.replaceAll('_', ' ')[0].toUpperCase() + category.replaceAll('_', ' ').slice(1);

  useEffect(() => {
    // Fetch content based on category and set it in the content store
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };
    getContent();
  }, [category, contentType]);

  // handle scroll listener for cards-sliding
  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-2xl font-semibold mb-4">
        {formattedCategoryName} {formattedContentType}
      </h2>
      <div className="flex space-x-4 overflow-x-auto no-scrollbar" ref={sliderRef}>
        {content?.map((item) => (
          <Link to={`/watch/${item.id}`} key={item.id} className="min-w-[250px] relative group">
            <div className="rounded-lg overflow-hidden">
              <img
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt={item.title}
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
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

export default ContentSlider;
