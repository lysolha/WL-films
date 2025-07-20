import CardSkeleton from './CardSkeleton';

const ListSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default ListSkeleton;
