import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createUser, loginUser } from '../store/extraReducers/userExtraReduсer';
import type { AppDispatch } from '../store/store';

import { toast } from 'react-toastify';

import AuthForm from '../components/Forms/AuthForm';
import {
  loginSchema,
  registerSchema,
} from '../components/Forms/validationSchemas/authSchems';
import { handleApiError } from '../store/APIs/errorHandler';

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [method, setMethod] = useState<'login' | 'register'>('login');
  const [validationSchema, setValidationSchema] = useState(loginSchema);
  const registerRef = useRef<HTMLAnchorElement>(null);
  const loginRef = useRef<HTMLAnchorElement>(null);

  const handleMethodChange = (method: 'login' | 'register') => {
    setMethod(method);
    if (method === 'register') {
      setValidationSchema(registerSchema);
    } else {
      setValidationSchema(loginSchema);
    }
  };

  const handleSubmit = async (values: {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
  }) => {
    if (method === 'register') {
      try {
        await dispatch(
          createUser({
            name: values.name || '',
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword || '',
          })
        ).unwrap();
        navigate('/dashboard');
        toast.success('Registered successfully');
      } catch (error) {
        toast.error(
          <div className="flex flex-col">
            <span>Registration failed.</span>
            {handleApiError(error)}
          </div>
        );
      }
    } else {
      try {
        await dispatch(loginUser(values)).unwrap();
        navigate('/dashboard');
        toast.success('Logged in successfully');
      } catch (error) {
        toast.error(
          <div className="flex flex-col">
            <span>Login failed.</span>
            {handleApiError(error)}
          </div>
        );
      }
    }
  };

  useEffect(() => {
    handleMethodChange(method);
  }, [method]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full min-h-1/2 border border-gray-300 rounded-md p-4 shadow-md lg:w-1/2">
        <h1 className="text-3xl font-bold text-center my-8 font-header">
          Welcome to Films editor
        </h1>

        <AuthForm
          key={method}
          method={method}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
        />
        <div className="flex gap-4 justify-center mt-4">
          <a
            ref={registerRef}
            href="#"
            className={`${
              method === 'register'
                ? 'text-cream underline font-bold'
                : 'text-fresh-light'
            }`}
            onClick={() => setMethod('register')}
          >
            Sign up
          </a>
          <a
            ref={loginRef}
            href="#"
            className={`${
              method === 'login'
                ? 'text-cream underline font-bold'
                : 'text-fresh-light'
            }`}
            onClick={() => setMethod('login')}
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
