import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../../../app/styles';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import PageNav from '../../common/PageNav/PageNav';
import Spinner from '../../common/Spinner/Spinner';

const RecipeList = ({
  loading,
  error,
  recipes,
  count,
  page,
  handleChangePage,
}) => {
  const classes = useStyles();

  if (!loading && error) return <EmptyMessage />;
  if (!loading && recipes.length >= 0)
    return (
      <>
        {recipes.length === 0 ? (
          <EmptyMessage />
        ) : (
          <>
            <Grid
              container
              alignItems="stretch"
              spacing={3}
              className={classes.listContainer}
            >
              {recipes.map((recipe, recipeIdx) => (
                <Grid
                  key={`{'explore-page-${recipe._id}-${recipeIdx}`}
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <RecipeCard recipe={recipe} />
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
  return <Spinner />;
};

export default RecipeList;
