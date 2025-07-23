import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string()
    .transform((value) => value.trim())
    .required('Name is required'),
  email: Yup.string()
    .transform((value) => value.trim())
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .transform((value) => value.trim())
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters long'),
  confirmPassword: Yup.string()
    .transform((value) => value.trim())
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords should be equal'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .transform((value) => value.trim())
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .transform((value) => value.trim())
    .required('Password is required'),
});
