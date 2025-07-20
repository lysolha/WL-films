import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FileDragAndDropField from './FileDragAndDropField';
import Button from './ui/Button';

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
      <h1>Import form</h1>
      <p>
        Upload a txt file containing film data
        <Button onClick={() => console.log('download template')}>
          Download template
        </Button>
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          file: Yup.mixed().required('File is required'),
        })}
        onSubmit={(values) => {
          console.log('values', values);
          handleImportFilms(values.file);
        }}
        onReset={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form className="flex flex-col gap-2">
            <FileDragAndDropField name="file" />
            <Button type="submit">Import</Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ImportForm;
