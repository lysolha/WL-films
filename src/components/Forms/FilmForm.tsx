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
    year: film?.year || 0,
    format: film?.format || 'DVD',
    actors: film?.actors.map((actor) => actor.name) || [],
  };

  const formatOptions = [
    { label: 'DVD', value: 'DVD' },
    { label: 'VHS', value: 'VHS' },
  ];

  return (
    <div className="flex flex-col gap-2 mt-4">
      <Formik
        initialValues={initialValues}
        validationSchema={filmSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ values, dirty, isValid, setFieldValue }) => (
          <Form className="flex flex-col gap-2">
            <Input name="title" label="Title" placeholder="Title" />
            <Input name="year" label="Year" placeholder="Year" type="number" />
            <Select
              name="format"
              value={values.format}
              onChange={(e) => setFieldValue('format', e.target.value)}
              options={formatOptions}
            />
            <FieldArray
              name="actors"
              render={({ push, remove }) => (
                <div>
                  <h2 className="text-lg font-bold">Actors</h2>
                  <ul className="flex flex-col gap-2 ml-6">
                    {values.actors.map((_, index) => (
                      <li key={index} className="flex gap-2 items-end">
                        <Input
                          name={`actors[${index}]`}
                          label="Actor"
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
    </div>
  );
};

export default FilmForm;
