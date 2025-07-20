import { useField } from 'formik';
import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Input = ({ label, icon, onClick, ...props }: InputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={twMerge('flex flex-col gap-2 w-full', props.className)}>
      <label htmlFor={props.id}>{label}</label>
      <div className="relative">
        <input
          type="text"
          {...field}
          {...props}
          className={`w-full h-10 text-lg bg-cream/30 border border-cream text-charcoal-dark rounded-md p-2 hover:bg-cream/50 focus:bg-cream/50 focus:border-cream focus:border-2 focus-visible:outline-none transition-all duration-200 ${
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
