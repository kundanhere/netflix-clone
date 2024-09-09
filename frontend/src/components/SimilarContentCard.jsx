import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants.js';

const SimilarContentCard = ({ item }) => {
  return (
    <Link to={`/watch/${item.id}`} className="w-52 flex-none group overflow-hidden">
      <div className="rounded-lg overflow-hidden h-72">
        <img
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
          src={SMALL_IMG_BASE_URL + item.poster_path}
          alt={item.title}
        />
      </div>
      <h4 className="mt-2 text-xs lg:text-md font-semibold leading-5">{item.title || item.name}</h4>
    </Link>
  );
};

export default SimilarContentCard;
