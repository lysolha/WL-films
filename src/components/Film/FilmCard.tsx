import { Link } from 'react-router-dom';
import type { Film } from '../../types/Film';
import PlayIcon from '../ui/icons/PlayIcon';

const FilmCard = ({ film }: { film: Film }) => {
  return (
    <Link
      to={`/film-info/${film.id}`}
      className="flex flex-col gap-2 border border-cream rounded-md p-4 text-center min-h-[300px] hover:bg-charcoal-dark transition-all duration-200"
    >
      <div className="flex justify-center items-center py-10 px-4">
        <PlayIcon />
      </div>
      <h3 className="text-lg font-bold">{film.title}</h3>
      <h4 className="text-sm text-cream">{film.year}</h4>
      <h5 className="text-sm text-cream">{film.format}</h5>
    </Link>
  );
};

export default FilmCard;
