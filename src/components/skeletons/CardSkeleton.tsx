import PlayIcon from '../ui/icons/PlayIcon';

const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 border border-cream rounded-md p-4 text-center min-h-[300px] hover:bg-charcoal-dark transition-all duration-200">
      <div className="flex justify-center items-center py-10 px-4">
        <PlayIcon />
      </div>
      <h3 className="text-lg font-bold">Loading...</h3>
      <h4 className="text-sm text-cream">Loading...</h4>
      <h5 className="text-sm text-cream">Loading...</h5>
    </div>
  );
};

export default CardSkeleton;
