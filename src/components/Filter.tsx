import { useContext } from 'react';
import { SearchContext } from '../pages/Home';
import Select from './ui/Select';

const Filter = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error('SearchForm must be used within SearchContext.Provider');
  }

  const { sort, setSort, order, setOrder } = searchContext;

  const sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'year', label: 'Year' },
    { value: 'id', label: 'Created' },
  ];

  const orderOptions = [
    { value: 'ASC', label: 'Ascending' },
    { value: 'DESC', label: 'Descending' },
  ];

  return (
    <div className="flex gap-2">
      <Select
        label=""
        name="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        options={sortOptions}
      />
      <Select
        label=""
        name="order"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        options={orderOptions}
      />
    </div>
  );
};

export default Filter;
