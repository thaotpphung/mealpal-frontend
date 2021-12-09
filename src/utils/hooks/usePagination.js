import { useState, useEffect } from 'react';

const usePagination = (
  initialQuery,
  initialLimit,
  callback,
  fields,
  queryTypes
) => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1); // number of total page on load -> pageCount
  const [queryFields, setQueryFields] = useState({
    ...initialQuery,
    page: 0,
    limit: initialLimit,
    fields,
    queryTypes,
  });
  const [limit, setLimit] = useState(initialLimit); // number of documents per page
  const [count, setCount] = useState(0);
  const [withCallback, setWithCallback] = useState(true);
  const [sort, setSort] = useState('updatedTime');
  const [sortOrder, setSortOder] = useState('desc');

  const buildQuery = (newLimit, newPage, newSort, newSortOrder) => {
    let query = { ...queryFields };
    Object.entries(query).map(([key, value]) => {
      if (value === '') delete query[key];
    });
    query.limit = newLimit;
    query.page = newPage;
    query.sort = `${newSortOrder === 'desc' ? '-' : ''}${newSort}`;
    return query;
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

  const handleChangeSort = (newSort, newSortOrder) => {
    setSort(newSort);
    setSortOder(newSortOrder);
    callback(limit, page, newSort, newSortOrder);
  };

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
    sort,
    sortOrder,
    handleSubmitFilter,
    handleChangeQueryField,
    handleChangePageCount,
    handleChangeLimitAndPage,
    handleChangeSort,
  };
};

export default usePagination;
