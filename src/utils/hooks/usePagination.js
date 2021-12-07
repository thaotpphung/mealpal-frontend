import { useState, useEffect } from 'react';

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
  const [withCallback, setWithCallback] = useState(true);

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

  useEffect(() => {
    if (withCallback) {
      callback(limit, page);
    }
  }, [page, limit, withCallback]);

  const handleChangeLimitAndPage = (
    newLimit = initialLimit,
    newPage = 0,
    newWithCallback = true
  ) => {
    if (newPage === 'next') {
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage(newPage);
    }
    setWithCallback(newWithCallback);
    setLimit(newLimit);
  };

  return {
    queryFields,
    limit,
    pageCount,
    page,
    count,
    buildQuery,
    handleSubmitFilter,
    handleChangeQueryField,
    handleChangePageCount,
    handleChangeLimitAndPage,
  };
};

export default usePagination;
