import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../../../app/styles';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';

const ListAll = ({
  component,
  loadingMore,
  loading,
  error,
  lastElementRef,
  data,
}) => {
  const classes = useStyles();
  const Component = component;

  if (!loading && error) return <EmptyMessage />;
  if (!loading && data.length >= 0)
    return (
      <>
        {data.length === 0 ? (
          <EmptyMessage />
        ) : (
          <>
            <Grid
              container
              alignItems="stretch"
              spacing={3}
              className={classes.listContainer}
            >
              {data.map((item, itemIdx) => {
                if (data.length === itemIdx + 1) {
                  return (
                    <Grid
                      ref={lastElementRef}
                      key={`{'explore-page-${item._id}-${itemIdx}`}
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      xl={3}
                    >
                      <Component data={item} />
                    </Grid>
                  );
                } else {
                  return (
                    <Grid
                      key={`{'explore-page-${item._id}-${itemIdx}`}
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      xl={3}
                    >
                      <Component data={item} />
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

export default ListAll;
