import { useState } from 'react';

const usePagination = (
  initialState,
  initialPage,
  initialLimit,
  callBack,
  initialQuery = ''
) => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1); // number of total page on load -> pageCount
  const [queryFields, setQueryFields] = useState(initialState);
  const [limit, setLimit] = useState(initialLimit); // number of documents per page
  const [count, setCount] = useState(0);

  const buildQuery = (page = 1, limit = initialLimit) => {
    let filterQuery = '?';
    filterQuery += `limit=${limit}&page=${page}`;
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
    handleChangePageCount(newCount);
    console.log('call back in handle submit filter');
    callBack();
  };

  const handleChangePageCount = (newCount, newLimit) => {
    console.log(
      'change page count',
      newCount,
      'new limit',
      newLimit,
      'limit',
      limit
    );
    const newPageCount = newCount / newLimit;
    console.log(
      'set new page count to',
      newPageCount !== 1 ? Math.floor(newPageCount) + 1 : newPageCount
    );
    setCount(newCount);
    setPageCount(
      newPageCount !== 1 ? Math.floor(newPageCount) + 1 : newPageCount
    );
  };

  const handleChangePage = (event, newPage) => {
    console.log('change page');
    setPage(newPage);
    callBack(newPage, limit);
  };

  const handleChangeLimit = (newLimit) => {
    console.log('change limit');

    setLimit(newLimit);
    callBack(page, newLimit);
  };

  const handleChangePageAndLimit = (newPage, newLimit) => {
    console.log('change page and limit', newPage, newLimit);
    setPage(newPage);
    setLimit(newLimit);
    // callBack(newPage, newLimit);
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
