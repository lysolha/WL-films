import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import type { Film, FormFilm } from '../types/Film';
import Button from './ui/Button';
import Input from './ui/Input';

interface FilmFormProps {
  film?: Film;
  onSubmit: (values: FormFilm) => void;
}

const FilmForm = ({ film, onSubmit }: FilmFormProps) => {
  const initialValues = {
    id: film?.id || '',
    title: film?.title || '',
    year: film?.year || 0,
    format: film?.format || '',
    actors: film?.actors.map((actor) => actor.name) || [],
  };

  return (
    <>
      <h1>Film Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string().max(30, 'Must be 30 characters or less'),
          year: Yup.number().min(1900, 'Must be greater than 1900'),
          format: Yup.string().max(10, 'Must be 10 characters or less'),
          list: Yup.array().of(
            Yup.string().max(30, 'Must be 30 characters or less')
          ),
        })}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        onReset={(values) => {
          console.log(values);
        }}
      >
        {({ values, dirty, isValid }) => (
          <Form className="flex flex-col gap-2">
            <Input name="title" label="Title" placeholder="Title" />
            <Input name="year" label="Year" placeholder="Year" type="number" />
            <Input name="format" label="Format" placeholder="Format" />
            <FieldArray
              name="actors"
              render={({ push, remove }) => (
                <ul className="flex flex-col gap-2">
                  {values.actors.map((_, index) => (
                    <li key={index} className="flex gap-2 items-center">
                      <Input
                        name={`actors[${index}]`}
                        label="Actor"
                        placeholder="Actor"
                      />
                      <Button type="button" onClick={() => remove(index)}>
                        Delete
                      </Button>
                    </li>
                  ))}
                  <Button type="button" onClick={() => push('')}>
                    Add Actor
                  </Button>
                </ul>
              )}
            />

            <div className="flex gap-2">
              <Button type="reset" className="w-full" disabled={!dirty}>
                reset
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={!dirty || !isValid}
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FilmForm;
