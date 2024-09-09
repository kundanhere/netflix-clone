import { Link } from 'react-router-dom';
import { ORIGIN_IMG_BASE_URL } from '../utils/constants.js';

const Card = ({ data, type, onClick }) => {
  // Adjust image source based on type (movie, person, etc.)
  const imageSrc = type === 'person' ? ORIGIN_IMG_BASE_URL + data.profile_path : ORIGIN_IMG_BASE_URL + data.poster_path;

  return (
    <div>
      <div className="p-2 md:p-4 rounded-2xl h-64 md:h-96 group relative overflow-hidden ring-1 ring-inset ring-offset-0 ring-offset-white ring-[#454e5d80] ">
        <Link to={'/watch/' + data.id} onClick={onClick}>
          <img
            src={imageSrc}
            alt={data.title || data.name}
            className="h-full w-full rounded-xl object-cover object-top relative z-20 shadow-2xl"
          />
          <img
            src={imageSrc}
            alt={data.title || data.name}
            aria-hidden="true"
            className="h-80 md:h-96 w-full rounded-xl object-cover absolute top-2 left-1/2 -translate-x-1/2 blur-xl z-10"
          />
        </Link>
      </div>
      <h2 className="mt-2 text-xs lg:text-md font-semibold leading-5">{data.title || data.name}</h2>
    </div>
  );
};

export default Card;
