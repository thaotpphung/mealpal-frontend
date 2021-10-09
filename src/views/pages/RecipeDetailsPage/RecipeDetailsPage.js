import React from 'react';
import useStyles from './styles';
import { useParams, Link } from 'react-router-dom';

const RecipeDetailsPage = () => {
  const classes = useStyles();
  const { recipeId } = useParams();

  return (
    <div>
      {recipeId ? <>edit recipe {recipeId}</> : <> new recipe {recipeId}</>}
    </div>
  );
};

export default RecipeDetailsPage;
