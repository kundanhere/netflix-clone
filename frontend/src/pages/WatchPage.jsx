import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';
import axios from 'axios';

import Navbar from '../components/Navbar';
import SimilarContent from '../components/SimilarContent';
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';
import { ORIGIN_IMG_BASE_URL } from '../utils/constants.js';
import { formatReleaseDate } from '../utils/formatDate.js';
import { useContentStore } from '../store/content.store.js';

const WatchPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [trailers, setTrailers] = useState([]);
  const [content, setContent] = useState({});
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);

  const { contentType } = useContentStore();

  // get the content trailers
  useEffect(() => {
    const getTrailers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.content);
      } catch (error) {
        if (error.message.includes('404')) setTrailers([]);
      } finally {
        setLoading(false);
      }
    };
    getTrailers();
  }, [contentType, id]);

  // get the content details
  useEffect(() => {
    const getContentDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes('404')) setContent(null);
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIndex < trailers.length - 1) setCurrentTrailerIndex(currentTrailerIndex + 1);
  };
  const handlePrev = () => {
    if (currentTrailerIndex > 0) setCurrentTrailerIndex(currentTrailerIndex - 1);
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-black p-10">
          <WatchPageSkeleton />
        </div>
      ) : (
        <div className="bg-black text-white min-h-screen">
          <div className="mx-auto container px-4 py-8 h-full">
            <Navbar />
            {!content ? (
              <div className="text-center mx-auto px-4 py-8  mt-40">
                <h2 className="text-2xl sm:text-5xl font-bold text-balance">Content not found 😥</h2>
              </div>
            ) : (
              <>
                {/* movie/tv trailers */}
                {trailers.length > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <button
                      className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIndex === 0 ? 'opacity-50 cursor-not-allowed ' : ''}}`}
                      disabled={currentTrailerIndex === 0}
                      onClick={handlePrev}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                        currentTrailerIndex === trailers.length - 1 ? 'opacity-50 cursor-not-allowed ' : ''
                      }}`}
                      disabled={currentTrailerIndex === trailers.length - 1}
                      onClick={handleNext}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}

                {/* video player */}
                <div className="aspect-video p-2 sm:px-10 md:px-32">
                  {trailers.length > 0 && (
                    <ReactPlayer
                      controls={true}
                      width={'100%'}
                      height={'70vh'}
                      className="mx-auto overflow-hidden rounded-lg"
                      url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
                    />
                  )}

                  {trailers.length === 0 && (
                    <h2 className="text-xl text-center mt-5">
                      No trailers available for{' '}
                      <span className="font-bold text-red-600">{content?.title || content?.name}</span> 😥
                    </h2>
                  )}
                </div>

                {/* content details */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 max-w-6xl mx-auto my-12">
                  <div className="mb-4 md:mb-0 w-full md:w-1/2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
                      {content?.title || content?.name}
                    </h2>
                    <p className="mt-2 text-lg">
                      {formatReleaseDate(content?.release_date || content?.first_air_date)} |{' '}
                      {content?.adult ? (
                        <span className="text-red-600">18+</span>
                      ) : (
                        <span className="text-green-600">PG-13</span>
                      )}{' '}
                    </p>
                    <p className="mt-4 text-balance text-slate-200 text-xs md:text-lg leading-5">{content?.overview}</p>
                  </div>

                  <div className="p-4 rounded-2xl h-[420px] max-h-[420px] w-full md:w-1/3 group relative overflow-hidden ring-1 ring-inset ring-offset-0 ring-offset-white ring-[#454e5d80] ">
                    <img
                      src={ORIGIN_IMG_BASE_URL + content?.poster_path}
                      alt={content.title || content.name}
                      className="max-h-[420px] h-full w-full rounded-xl object-cover object-top relative z-20 shadow-2xl"
                    />
                    <img
                      src={ORIGIN_IMG_BASE_URL + content?.poster_path}
                      alt={content.title || content.name}
                      aria-hidden="true"
                      className="h-full max-h-[420px] w-full rounded-xl object-cover absolute top-2 left-1/2 -translate-x-1/2 blur-xl z-10"
                    />
                  </div>
                </div>

                {/* similar movies and tv shows */}
                <SimilarContent id={id} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WatchPage;
