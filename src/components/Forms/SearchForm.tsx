import { Formik } from 'formik';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Form } from 'react-router-dom';
import { SearchContext } from '../../pages/Home';
import Input from '../ui/Input';
import { searchSchema } from './validationSchemas/searchSchema';

const SearchForm = () => {
  const searchContext = useContext(SearchContext);
  const [searchPlaceholder, setSearchPlaceholder] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!searchContext) {
    throw new Error('SearchForm must be used within SearchContext.Provider');
  }

  const { setSearch, search } = searchContext;

  useEffect(() => {
    setSearchPlaceholder(search);
  }, [search]);

  const debouncedSetSearch = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (value.length >= 2) {
          setSearch(value);
        } else if (value.length === 0) {
          setSearch('');
        }
      }, 1000);
    },
    [setSearch]
  );

  const handleSearch = (value: string) => {
    debouncedSetSearch(value);
  };

  return (
    <Formik
      initialValues={{
        search: '',
      }}
      validationSchema={searchSchema}
      onSubmit={() => {}}
    >
      <Form className="flex flex-col gap-1 my-4">
        <Input
          name="search"
          label=""
          placeholder="Search"
          onChange={(e) => {
            const currentValue = e.target.value;
            setSearchPlaceholder(currentValue);
            handleSearch(currentValue.trim());
          }}
          value={searchPlaceholder}
        />
        {searchPlaceholder.length < 2 && (
          <p className="text-sm text-gray-500">
            enter at least 2 characters to search
          </p>
        )}
      </Form>
    </Formik>
  );
};

export default SearchForm;
