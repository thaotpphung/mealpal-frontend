import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../../../app/styles';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import WeekCard from '../../components/WeekCard/WeekCard';
import PageNav from '../../common/PageNav/PageNav';

const WeekList = ({ weeks, count, page, handleChangePage }) => {
  const classes = useStyles();

  return (
    <>
      {weeks.length === 0 ? (
        <EmptyMessage />
      ) : (
        <>
          <Grid
            container
            alignItems="stretch"
            spacing={3}
            className={classes.listContainer}
          >
            {weeks.map((week, weekIdx) => (
              <Grid
                key={`{'explore-page-${week._id}-${weekIdx}`}
                item
                xs={12}
                md={6}
                lg={4}
                xl={3}
              >
                <WeekCard week={week} />
              </Grid>
            ))}
          </Grid>
          <PageNav
            count={count}
            page={page}
            handleChangePage={handleChangePage}
            className={classes.pagination}
          />
        </>
      )}
    </>
  );
};

export default WeekList;
