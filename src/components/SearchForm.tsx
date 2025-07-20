import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import SearchIcon from '../assets/icons/magnifying-glass-svgrepo-com.svg';
import Button from './ui/Button';
import Input from './ui/Input';

const SearchForm = () => {
  return (
    <div className="my-4">
      <Formik
        initialValues={{
          search: '',
        }}
        validationSchema={Yup.object({
          search: Yup.string().max(30, 'Must be 30 characters or less'),
        })}
        onSubmit={(values) => {
          // search by filters
          console.log(values);
        }}
      >
        <Form className="flex items-center gap-2">
          <Input name="search" label="" placeholder="Search" />
          <Button type="submit">
            <img width={20} height={20} src={SearchIcon} alt="Search" />
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchForm;
