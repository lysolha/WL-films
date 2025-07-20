import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import type { RootState } from '../../store/store';
import Button from '../ui/Button';
import SearchIcon from '../ui/icons/SearchIcon';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface SearchFormValues {
  search: string;
  sort: string;
  order: string;
}

interface SearchFormProps {
  onSearch: (
    page?: number,
    search?: string,
    sort?: string,
    order?: string
  ) => Promise<void>;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { token } = useSelector((state: RootState) => state.user);

  const handleSearch = async (values: SearchFormValues) => {
    if (!token) return;
    try {
      await onSearch(1, values.search, values.sort, values.order); // Reset to page 1 when searching
    } catch (error) {
      toast.error(`Films search failed: ${error}`);
    }
  };

  const sortOptions = [
    { value: '', label: 'No sorting' },
    { value: 'title', label: 'Title' },
    { value: 'year', label: 'Year' },
    { value: 'id', label: 'Created' },
  ];

  const orderOptions = [
    { value: '', label: 'Select Order' },
    { value: 'ASC', label: 'Ascending' },
    { value: 'DESC', label: 'Descending' },
  ];

  return (
    <div className="mt-4 mb-10">
      <Formik
        initialValues={{
          search: '',
          sort: '',
          order: '',
        }}
        validationSchema={Yup.object({
          search: Yup.string().max(30, 'Must be 30 characters or less'),
          sort: Yup.string(),
          order: Yup.string(),
        })}
        onSubmit={(values) => {
          handleSearch(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex items-center gap-2">
            <Input name="search" label="" placeholder="Search" />
            <Select
              name="sort"
              value={values.sort}
              onChange={(e) => setFieldValue('sort', e.target.value)}
              options={sortOptions}
            />
            <Select
              name="order"
              value={values.order}
              onChange={(e) => setFieldValue('order', e.target.value)}
              disabled={!values.sort}
              options={orderOptions}
            />
            <Button type="submit">
              <SearchIcon />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
