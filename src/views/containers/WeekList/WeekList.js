import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../../../app/styles';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import WeekCard from '../../components/WeekCard/WeekCard';
import PageNav from '../../common/PageNav/PageNav';

const WeekList = ({ lastElementRef, weeks, count, page, handleChangePage }) => {
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
            {weeks.map((week, weekIdx) => {
              if (weeks.length === weekIdx + 1) {
                return (
                  <Grid
                    ref={lastElementRef}
                    key={`{'explore-page-${week._id}-${weekIdx}`}
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                  >
                    <WeekCard week={week} />
                  </Grid>
                );
              } else {
                return (
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
                );
              }
            })}
          </Grid>
          <PageNav
            count={count}
            page={page + 1}
            handleChangePage={handleChangePage}
            className={classes.pagination}
          />
        </>
      )}
    </>
  );
};

export default WeekList;
