import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Grid, Button, TextField } from '@material-ui/core';
import useStyles from './styles';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import routes from '../../../constants/routes';
import {
  createRecipe,
  getAllRecipes,
} from '../../../redux/actions/recipeActions';

const RecipePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState('');
  const [isShowNewRecipeForm, setIsShowNewRecipeForm] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { recipes } = useSelector((state) => state.recipeList);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  const handleChangeRecipeName = (event) => {
    setRecipeName(event.target.value);
  };

  const handleClickShowCreateRecipeForm = () => {
    setIsShowNewRecipeForm(!isShowNewRecipeForm);
  };

  const handleSubmitCreateRecipe = () => {
    dispatch(createRecipe({ recipeName, userId: currentUser._id }));
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickShowCreateRecipeForm}
      >
        + Recipe
      </Button>
      {isShowNewRecipeForm && (
        <>
          <TextField
            variant="outlined"
            value={recipeName}
            onChange={handleChangeRecipeName}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitCreateRecipe}
          >
            Submit
          </Button>
        </>
      )}
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {Object.values(recipes).map((recipe) => (
          <Grid key={recipe._id} item xs={12} sm={3} md={3}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecipePage;
