import type { SelectHTMLAttributes } from 'react';
import ArrowIcon from '../ui/icons/ArrowIcon';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  label?: string;
}

const Select = ({ options, label = '', ...props }: SelectProps) => {
  return (
    <div className="flex flex-col gap-1 relative">
      {label && <label htmlFor={props.id}>{label}</label>}
      <div className="relative">
        <select
          {...props}
          className="w-full px-3 py-2 border border-cream rounded-md ring-0 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-charcoal-dark transition-all duration-200"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ArrowIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};

export default Select;
