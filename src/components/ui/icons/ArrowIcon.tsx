import { twMerge } from 'tailwind-merge';

const ArrowIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="-19.04 0 75.804 75.804"
      className={twMerge('w-4 h-4 stroke-cream fill-cream', className)}
    >
      <g
        id="Group_65"
        data-name="Group 65"
        transform="translate(-831.568 -384.448)"
      >
        <path
          id="Path_57"
          data-name="Path 57"
          d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
          fill="#e9dccd"
        />
      </g>
    </svg>
  );
};

export default ArrowIcon;
