import * as Yup from 'yup';

export const searchSchema = Yup.object({
  search: Yup.string()
    .min(2, 'Must be 3 characters or more')
    .max(30, 'Must be 30 characters or less'),
});
