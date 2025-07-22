import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string()
    .transform((value) => value.trim())
    .required('Required'),
  email: Yup.string()
    .transform((value) => value.trim())
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .transform((value) => value.trim())
    .required('Required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .transform((value) => value.trim())
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .transform((value) => value.trim())
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .transform((value) => value.trim())
    .required('Required'),
});
