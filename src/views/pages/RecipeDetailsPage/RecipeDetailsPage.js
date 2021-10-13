import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, TextField } from '@material-ui/core';
import useStyles from './styles';
import { useParams, Link } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import IngredientsCard from '../../components/IngredientsCard/IngredientCards';
import InstructionsCard from '../../components/InstructionsCard/InstructionsCard';

const RecipeDetailsPage = () => {
  const classes = useStyles();
  const { recipeId } = useParams();
  const { recipes } = useSelector((state) => state.recipeList);
  const recipe = recipes[recipeId];

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={12} sm={6}>
          <RecipeCard recipe={recipe} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IngredientsCard recipe={recipe} />
        </Grid>
      </Grid>
      <InstructionsCard recipe={recipe} />
    </div>
  );
};

export default RecipeDetailsPage;
