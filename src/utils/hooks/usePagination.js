import { useState } from 'react';

const usePagination = (
  initialState,
  initialLimit,
  callback,
  initialQuery = ''
) => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1); // number of total page on load -> pageCount
  const [queryFields, setQueryFields] = useState(initialState);
  const [limit, setLimit] = useState(initialLimit); // number of documents per page
  const [count, setCount] = useState(0);

  const buildQuery = (newLimit = initialLimit, newPage = 0) => {
    let filterQuery = '?';
    filterQuery += `limit=${newLimit}&page=${newPage}`;
    filterQuery += initialQuery;
    Object.entries(queryFields).map(([key, value]) => {
      if (value !== '' && value !== 0) filterQuery += `&${key}=${value}`;
    });
    return filterQuery;
  };

  const handleChangeQueryField = (event) => {
    const { name, value } = event.target;
    setQueryFields({ ...queryFields, [name]: value });
  };

  const handleSubmitFilter = () => {
    callback(limit);
  };

  const handleChangePageCount = (newCount) => {
    const newPageCount = newCount / limit;
    setCount(newCount);
    setPageCount(
      newPageCount !== 1 ? Math.floor(newPageCount) + 1 : newPageCount
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    callback(limit, newPage);
  };

  const handleChangeLimit = (newLimit) => {
    setPage(0);
    setLimit(newLimit);
    callback(newLimit);
  };

  return {
    queryFields,
    limit,
    pageCount,
    page,
    count,
    buildQuery,
    handleSubmitFilter,
    handleChangePage,
    handleChangeLimit,
    handleChangeQueryField,
    handleChangePageCount,
  };
};

export default usePagination;
