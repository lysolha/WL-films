import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  label?: string;
}

const Select = ({ options, label = '', ...props }: SelectProps) => {
  return (
    <>
      {label && (
        <label htmlFor={props.id} className="text-sm text-gray-500">
          {label}
        </label>
      )}
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
    </>
  );
};

export default Select;
