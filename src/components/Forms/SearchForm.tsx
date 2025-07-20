import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import SearchIcon from '../../assets/icons/magnifying-glass-svgrepo-com.svg';
import type { RootState } from '../../store/store';
import Button from '../ui/Button';
import Input from '../ui/Input';

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
    <div className="my-4">
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
            <select
              value={values.sort}
              onChange={(e) => setFieldValue('sort', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={values.order}
              onChange={(e) => setFieldValue('order', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!values.sort}
            >
              {orderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button type="submit">
              <img width={20} height={20} src={SearchIcon} alt="Search" />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
