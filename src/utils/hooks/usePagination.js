import { useState } from 'react';

const usePagination = (
  initialState,
  initialLimit,
  callBack,
  initialQuery = ''
) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1); // number of total page on load
  const [queryFields, setQueryFields] = useState(initialState);

  const buildQuery = (page = 1, additionalQuery = '') => {
    let filterQuery = '?';
    filterQuery += `limit=${initialLimit}&page=${page}`;
    filterQuery += initialQuery;
    Object.entries(queryFields).map(([key, value]) => {
      if (value !== '') filterQuery += `&${key}=${value}`;
    });
    filterQuery += additionalQuery;
    return filterQuery;
  };

  const handleChangeQueryField = (event) => {
    const { name, value } = event.target;
    setQueryFields({ ...queryFields, [name]: value });
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    callBack(value);
  };

  const handleSubmitFilter = (newCount) => {
    callBack();
    setPageCount(newCount);
  };

  const setPageCount = (newCount) => {
    const pageCount = newCount / initialLimit;
    setCount(pageCount !== 1 ? Math.floor(pageCount) + 1 : pageCount);
  };

  return {
    queryFields,
    count,
    page,
    buildQuery,
    handleSubmitFilter,
    handleChangePage,
    handleChangeQueryField,
    setPageCount,
  };
};

export default usePagination;
