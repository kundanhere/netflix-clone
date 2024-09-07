import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants.js';

const CategoryCard = ({ item }) => {
  return (
    <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group">
      <div className="rounded-lg overflow-hidden">
        <img
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
          src={SMALL_IMG_BASE_URL + item.backdrop_path}
          alt={item.title}
        />
      </div>
      <p className="mt-2 text-center">{item.title || item.name}</p>
    </Link>
  );
};

export default CategoryCard;
