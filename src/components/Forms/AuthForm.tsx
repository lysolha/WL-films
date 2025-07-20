import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import EyeIcon from '../../assets/icons/eye-svgrepo-com.svg';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AuthFormProps {
  method: 'login' | 'register';
  validationSchema: Yup.ObjectSchema<object>;
  handleSubmit: (values: {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  }) => void;
}

const AuthForm = ({
  method,
  validationSchema,
  handleSubmit,
}: AuthFormProps) => {
  const initialValues = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {({ dirty, isValid }) => (
        <Form className="flex flex-col gap-4 items-center justify-center">
          <Input
            name="name"
            label="Name"
            placeholder="Name"
            disabled={method === 'login'}
            className={method === 'login' ? 'hidden' : ''}
          />
          <Input name="email" label="Email" placeholder="Email" />
          <Input
            name="password"
            label="Password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            icon={
              showPassword ? (
                <img width={20} height={20} src={EyeIcon} alt="Show password" />
              ) : (
                <img
                  width={20}
                  height={20}
                  src={EyeIcon}
                  alt="Show password"
                  className="opacity-50"
                />
              )
            }
            onClick={() => setShowPassword(!showPassword)}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            disabled={method === 'login'}
            className={method === 'login' ? 'hidden' : ''}
            icon={
              showPassword ? (
                <img width={20} height={20} src={EyeIcon} alt="Show password" />
              ) : (
                <img
                  width={20}
                  height={20}
                  src={EyeIcon}
                  alt="Show password"
                  className="opacity-50"
                />
              )
            }
            onClick={() => setShowPassword(!showPassword)}
          />
          <Button type="submit" disabled={!dirty || !isValid}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
