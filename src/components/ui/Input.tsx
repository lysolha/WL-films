import { useField } from 'formik';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <input
        type="text"
        {...field}
        {...props}
        className={`w-full h-10 border border-gray-300 rounded-md p-2 ${
          meta.error ? 'border-red-500' : ''
        }`}
      />
    </>
  );
};

export default Input;
