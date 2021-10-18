import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import useStyles from '../../../containers/styles';
import WeekInfoCard from '../../components/WeekInfoCard/WeekInfoCard';
import Pagination from '@material-ui/lab/Pagination';
import { getAllWeeks } from '../../../redux/actions/weekActions';

const ExplorePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { weeks } = useSelector((state) => state.weekList);
  const size = 9; // size of each page (number of items in each page)
  const [count, setCount] = useState(100); // number of total page
  const [page, setPage] = useState(1); // the current page
  useEffect(() => {
    dispatch(getAllWeeks());
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {Object.values(weeks).map((week, weekIdx) => (
          <Grid
            key={`{'explore-page-${week._id}-${weekIdx}`}
            item
            xs={12}
            sm={4}
            md={4}
          >
            <WeekInfoCard week={week} />
          </Grid>
        ))}
      </Grid>
      <div>
        <Pagination
          count={count}
          page={page}
          onChange={handleChangePage}
          className={classes.pagination}
        />
      </div>
    </div>
  );
};

export default ExplorePage;
