import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import useStyles from './styles';

const PageNav = ({ count, page, handleChangePage = () => {} }) => {
  const classes = useStyles();

  return (
    <Pagination
      shape="rounded"
      color="primary"
      count={count}
      page={page}
      boundaryCount={2}
      onChange={handleChangePage}
      className={classes.root}
      showLastButton
      showFirstButton
    />
  );
};

export default PageNav;
