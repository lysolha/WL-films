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
          className={`w-full h-10 border border-gray-300 rounded-md p-2 ${
            meta.error ? 'border-red-500' : ''
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
      {meta.error && <p className="text-red-500">{meta.error}</p>}
    </div>
  );
};

export default Input;
