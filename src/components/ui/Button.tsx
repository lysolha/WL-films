import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        'min-h-10 bg-charcoal text-cream px-4 py-2 border border-cream rounded-md cursor-pointer hover:bg-charcoal-dark transition-all duration-200 w-fit disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
