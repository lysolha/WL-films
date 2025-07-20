import type { Film } from '../../types/Film';
import ListSkeleton from '../skeletons/ListSkeleton';
import FilmCard from './FilmCard';

const FilmList = ({
  allFilms,
  isLoading,
}: {
  allFilms: Film[];
  isLoading: boolean;
}) => {
  if (isLoading) return <ListSkeleton />;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {allFilms && allFilms.length > 0 ? (
          allFilms.map((film) => <FilmCard key={film.id} film={film} />)
        ) : (
          <div className="text-center w-full text-cream text-2xl font-bold  p-4 col-span-3 underline underline-offset-4">
            No films found
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmList;
