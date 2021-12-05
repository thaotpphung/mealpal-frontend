import { useState, useEffect } from 'react';

const usePagination = (
  initialState,
  initialPage,
  initialLimit,
  callBack,
  initialQuery = ''
) => {
  const [page, setPage] = useState(initialPage);
  const [pageCount, setPageCount] = useState(1); // number of total page on load -> pageCount
  const [queryFields, setQueryFields] = useState(initialState);
  const [limit, setLimit] = useState(initialLimit); // number of documents per page
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('debug - page', page);
  }, [page]);

  const buildQuery = (newPage = initialPage, newLimit = initialLimit) => {
    console.log('build query', newPage, newLimit);
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

  const handleSubmitFilter = (newCount) => {
    console.log('handleSubmitfilter');
    // console.log('handleSubmitFilter', newCount);
    // handleChangePageCount(newCount);
    callBack(0, limit);
  };

  const handleChangePageCount = (newCount, newLimit) => {
    const newPageCount = newCount / newLimit;
    console.log(
      'change page count',
      newCount,
      'new limit',
      newLimit,
      'limit',
      limit,
      'set new page count to ',
      newPageCount !== 1 ? Math.floor(newPageCount) + 1 : newPageCount
    );
    setCount(newCount);
    setPageCount(
      newPageCount !== 1 ? Math.floor(newPageCount) + 1 : newPageCount
    );
  };

  const handleChangePage = (event, newPage) => {
    console.log('change page', newPage);
    setPage(newPage);
    callBack(newPage, limit);
  };

  const handleChangeLimit = (newLimit, defaultPage) => {
    setPage(defaultPage);
    console.log('change limit');
    setLimit(newLimit);
    callBack(defaultPage, newLimit);
  };

  const handleChangePageAndLimit = (
    newPage,
    newLimit,
    withCallback = false
  ) => {
    console.log('change page and limit', newPage, newLimit);
    setPage(newPage);
    setLimit(newLimit);
    if (withCallback) callBack(newPage, newLimit);
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
    handleChangePageAndLimit,
  };
};

export default usePagination;
