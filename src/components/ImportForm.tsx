import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FileDragAndDropField from './FileDragAndDropField';
import Button from './ui/Button';

const ImportForm = () => {
  const initialValues = {
    file: null,
  };
  return (
    <>
      <h1>Import form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          file: Yup.mixed().required('File is required'),
        })}
        onSubmit={(values) => {
          // save film
          console.log(values);
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
