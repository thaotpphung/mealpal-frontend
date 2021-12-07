import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../../../app/styles';
import WeekCard from '../../components/WeekCard/WeekCard';
import PageNav from '../../common/PageNav/PageNav';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';

const WeekList = ({ loadingMore, loading, error, lastElementRef, weeks }) => {
  const classes = useStyles();

  if (!loading && error) return <EmptyMessage />;
  if (!loading && weeks.length >= 0)
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
            {loadingMore && <Spinner />}
          </>
        )}
      </>
    );
  return <Spinner />;
};

export default WeekList;
