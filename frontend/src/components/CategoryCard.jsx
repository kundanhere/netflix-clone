import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants.js';

const CategoryCard = ({ item }) => {
  return (
    <Link to={`/watch/${item.id}`} className="min-w-[140px] sm:min-w-[200px] md:min-w-[250px] relative group">
      <div className="rounded-lg overflow-hidden">
        <img
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
          src={SMALL_IMG_BASE_URL + item.backdrop_path}
          alt={item.title}
        />
      </div>
      <p className="mt-2 text-xs leading-4 md:leading-5">{item.title || item.name}</p>
    </Link>
  );
};

export default CategoryCard;
