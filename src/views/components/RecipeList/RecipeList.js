import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../../../app/styles';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import RecipeCard from '../RecipeCard/RecipeCard';

const RecipeList = ({ recipes }) => {
  const classes = useStyles();

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
        </>
      )}
    </>
  );
};

export default RecipeList;
