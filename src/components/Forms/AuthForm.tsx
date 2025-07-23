import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Button from '../ui/Button';
import Input from '../ui/Input';
import EyeIcon from '../ui/icons/EyeIcon';

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
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={false}
    >
      {({ dirty }) => (
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
            icon={<EyeIcon className={`${!showPassword && 'opacity-50'}`} />}
            onClick={() => setShowPassword(!showPassword)}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            disabled={method === 'login'}
            className={method === 'login' ? 'hidden' : ''}
            icon={<EyeIcon className={`${!showPassword && 'opacity-50'}`} />}
            onClick={() => setShowPassword(!showPassword)}
          />
          <Button type="submit" disabled={!dirty}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
