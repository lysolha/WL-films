import { FieldArray, Form, Formik } from 'formik';
import type { Film, FormFilm } from '../../types/Film';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import DeleteIcon from '../ui/icons/DeleteIcon';
import filmSchema from './validationSchemas/filmSchema';

interface FilmFormProps {
  film?: Film;
  onSubmit: (values: FormFilm) => void;
}

const FilmForm = ({ film, onSubmit }: FilmFormProps) => {
  const initialValues = {
    id: film?.id || '',
    title: film?.title || '',
    year: film?.year || '',
    format: film?.format || 'DVD',
    actors: film?.actors.map((actor) => actor.name) || [''],
  };

  const formatOptions = [
    { label: 'DVD', value: 'DVD' },
    { label: 'VHS', value: 'VHS' },
    { label: 'Blu-Ray', value: 'Blu-Ray' },
  ];

  return (
    <div className="flex flex-col gap-2 mt-4">
      <Formik
        initialValues={initialValues}
        validationSchema={filmSchema}
        onSubmit={(values) => {
          onSubmit({
            ...values,
            year: Number(values.year),
          });
        }}
      >
        {({ values, dirty, isValid, setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            <Input name="title" label="Title" placeholder="Title" />
            <Input name="year" label="Year" placeholder="Year" type="text" />

            <Select
              name="Format"
              value={values.format}
              onChange={(e) => setFieldValue('format', e.target.value)}
              options={formatOptions}
              label="Format"
            />
            <FieldArray
              name="actors"
              render={({ push, remove }) => (
                <div>
                  <h2>Actors</h2>
                  <ul className="flex flex-col gap-2">
                    {values.actors.map((_, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <Input
                          name={`actors[${index}]`}
                          label=""
                          placeholder="Actor"
                        />
                        <Button type="button" onClick={() => remove(index)}>
                          <DeleteIcon />
                        </Button>
                      </li>
                    ))}
                    <Button type="button" onClick={() => push('')}>
                      Add Actor
                    </Button>
                  </ul>
                </div>
              )}
            />
            {values.actors.length === 0 && (
              <p className="text-error text-sm">
                At least one actor is required
              </p>
            )}

            <div className="flex gap-2 mt-10">
              <Button type="reset" className="w-full" disabled={!dirty}>
                Reset
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
    </div>
  );
};

export default FilmForm;
