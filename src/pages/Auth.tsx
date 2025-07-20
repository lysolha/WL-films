import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import AuthForm from '../components/AuthForm';
import { createUser, loginUser } from '../store/extraReducers/userExtraReduсer';
import type { AppDispatch } from '../store/store';

const Auth = () => {
  const [method, setMethod] = useState<'login' | 'register'>('login');
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));
  const registerRef = useRef<HTMLAnchorElement>(null);
  const loginRef = useRef<HTMLAnchorElement>(null);
  const handleMethodChange = (method: 'login' | 'register') => {
    setMethod(method);
    if (method === 'register') {
      setValidationSchema(
        Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string()
            .required('Required')
            .min(8, 'Password must be at least 8 characters long'),
          confirmPassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        })
      );
    } else {
      setValidationSchema(
        Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .required('Required'),
        })
      );
    }
  };
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleSubmit = async (values: {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
  }) => {
    if (method === 'register') {
      try {
        const token = await dispatch(
          createUser({
            name: values.name || '',
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword || '',
          })
        ).unwrap();
        if (token) {
          navigate('/');
          toast.success('Registered successfully');
        }
      } catch (error) {
        toast.error((error as { code?: string }).code || 'Registration failed');
      }
    } else {
      try {
        const token = await dispatch(loginUser(values)).unwrap();
        if (token) {
          navigate('/');
          toast.success('Logged in successfully');
        }
      } catch (error) {
        toast.error((error as { code?: string }).code || 'Login failed');
      }
    }
  };

  useEffect(() => {
    handleMethodChange(method);
  }, [method]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-1/2 min-h-1/2 border border-gray-300 rounded-md p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Films editor</h1>
        <h2 className="text-center mb-4"> {method}</h2>

        <AuthForm
          key={method}
          method={method}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
        />
        <div className="flex gap-4 justify-center">
          <a
            ref={registerRef}
            href="#"
            className={`text-blue-500 ${
              method === 'register' ? 'text-red-500' : 'text-blue-500'
            }`}
            onClick={() => setMethod('register')}
          >
            Register
          </a>
          <a
            ref={loginRef}
            href="#"
            className={`text-blue-500 ${
              method === 'login' ? 'text-red-500' : 'text-blue-500'
            }`}
            onClick={() => setMethod('login')}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
