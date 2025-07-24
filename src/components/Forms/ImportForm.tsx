import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../ui/Button';
import FileDragAndDropField from '../ui/FileDragAndDropField';

const ImportForm = ({
  handleImportFilms,
}: {
  handleImportFilms: (file: File | null) => void;
}) => {
  const initialValues = {
    file: null,
  };
  return (
    <>
      <h2 className="text-2xl font-bold text-center text-charcoal-dark">
        Import Films
      </h2>
      <p className="text-sm text-charcoal-dark">
        Upload a txt file containing film data
      </p>
      <a
        href="/sample_movies.txt"
        download
        className="px-4 py-2 bg-fresh text-white rounded text-sm text-center w-full"
      >
        template.txt
      </a>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          file: Yup.mixed()
            .required('File is required')
            .test('fileType', 'Only .txt files are allowed', (value) => {
              if (!value) return false;
              if (value instanceof File) {
                return (
                  value.type === 'text/plain' || value.name.endsWith('.txt')
                );
              }
              return false;
            }),
        })}
        onSubmit={(values) => {
          handleImportFilms(values.file);
        }}
      >
        {({ dirty, isValid }) => (
          <Form className="flex flex-col gap-2 h-full justify-between flex-grow">
            <FileDragAndDropField name="file" />
            <Button
              type="submit"
              className="mt-auto w-full"
              disabled={!dirty || !isValid}
            >
              Import
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ImportForm;
