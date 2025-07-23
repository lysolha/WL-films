import { useField } from 'formik';
import { useState, type InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Input = ({ label, icon, onClick, ...props }: InputProps) => {
  const [field, meta, helpers] = useField(props);
  const [inputValue, setInputValue] = useState(field.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 1 && e.target.value === ' ') {
      setInputValue(e.target.value.trim());
    } else {
      setInputValue(e.target.value);
    }
    helpers.setValue(e.target.value.trim());
  };

  return (
    <div className={twMerge('w-full', props.className)}>
      <label htmlFor={props.id}>{label}</label>
      <div className="relative">
        <input
          type="text"
          {...field}
          value={inputValue}
          onChange={handleChange}
          {...props}
          className={`w-full h-10 text-lg bg-charcoal border border-cream text-cream rounded-md p-2 hover:bg-charcoal-dark focus:bg-charcoal-dark focus:border-cream focus:border-2 focus-visible:outline-none transition-all duration-200 ${
            meta.touched && meta.error ? 'border-error' : ''
          }`}
        />
        {icon && field.value && (
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => {
              onClick?.();
            }}
          >
            {icon}
          </div>
        )}
      </div>
      {meta.touched && meta.error && (
        <p className="text-error text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default Input;
