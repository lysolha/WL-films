import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

const Select = ({ options, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className="lg:w-auto w-full px-3 py-2 border border-cream rounded-md ring-0 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-charcoal-dark transition-all duration-200"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
