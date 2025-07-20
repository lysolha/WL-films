import { Link } from 'react-router-dom';
import type { Film } from '../../types/Film';

const FilmCard = ({ film }: { film: Film }) => {
  return (
    <Link
      to={`film-info/${film.id}`}
      className="flex flex-col gap-2 border border-gray-300 rounded-md p-4 text-center"
    >
      <div className="text-lg font-bold">{film.title}</div>
      <div className="text-sm text-gray-500">{film.year}</div>
    </Link>
  );
};

export default FilmCard;
