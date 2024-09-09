import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Category from '../../components/Category';
import HomeScreenSkeleton from '../../components/skeletons/HomeScreenSkeleton';
import useGetTrendingContent from '../../hooks/useGetTrendingContent';
import { MOVIE_CATEGORIES, ORIGIN_IMG_BASE_URL, TV_CATEGORIES } from '../../utils/constants.js';
import { useContentStore } from '../../store/content.store.js';

const Home = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();

  // render content loading skeleton
  if (!trendingContent) return <HomeScreenSkeleton />;

  return (
    <>
      {/* Trending content section */}
      <div className="relative h-screen text-white">
        <Navbar />
        {imgLoading && <HomeScreenSkeleton />}
        <img
          src={ORIGIN_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="hero image"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => setImgLoading(false)}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50" aria-hidden="true" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:32">
          <div className="bg-gradient-to-br from-black  to-transparent absolute top-0 left-0 w-full h-full -z-10" />
          <div className="max-w-2xl">
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-md">
              {trendingContent?.release_date?.split('-')[0] || trendingContent?.first_air_date?.split('-')[0]} |{' '}
              {trendingContent?.adult ? '18+ Adult' : 'PG-13'}
            </p>
            <p className="mt-4 md:mb-8 text-balance text-xs md:text-lg leading-5">
              {trendingContent?.overview?.length > 200
                ? trendingContent?.overview?.slice(0, 200) + '...'
                : trendingContent?.overview}
            </p>
          </div>
          <div className="mt-8 md:mt-2 flex gap-2">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="flex items-center bg-white font-bold text-black py-2 px-3 rounded-lg hover:bg-white/80"
            >
              <Play className="size-4 mr-2 fill-black" /> Watch Now
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="flex items-center bg-gray-500/95 hover:bg-gray-500 text-black py-2 px-4 rounded-lg"
            >
              <Info className="size-4 mr-2" /> More Info
            </Link>
          </div>
        </div>
      </div>

      {/* Categories slider */}
      <div className="flex flex-col gap-2 md:gap-8 py-10 bg-black">
        {contentType === 'movie'
          ? MOVIE_CATEGORIES.map((category) => <Category key={category} category={category} />)
          : TV_CATEGORIES.map((category) => <Category key={category} category={category} />)}
      </div>
    </>
  );
};

export default Home;
