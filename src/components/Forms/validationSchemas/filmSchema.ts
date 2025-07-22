import * as Yup from 'yup';

const filmSchema = Yup.object({
  title: Yup.string()
    .transform((value) => value.trim())
    .max(30, 'Must be 30 characters or less')
    .required('Title is required'),
  year: Yup.number()
    .min(1900, 'Must be greater than 1900')
    .max(2021, 'Must be less than 2021')
    .required('Year is required'),
  format: Yup.string()
    .max(10, 'Must be 10 characters or less')
    .required('Format is required'),
  actors: Yup.array().of(
    Yup.string()
      .transform((value) => value.trim())
      .max(30, 'Must be 30 characters or less')
      .required('Actor is required')
  ),
});

export default filmSchema;
