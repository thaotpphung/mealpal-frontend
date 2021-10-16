import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Button, TextField, IconButton } from '@material-ui/core';
import useStyles from '../../../containers/styles';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Spinner from '../../common/Spinner/Spinner';
import FormContainer from '../../common/FormContainer/FormContainer';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import Input from '../../common/Input/Input';
import useDialog from '../../../utils/hooks/useDialog';
import useForm from '../../../utils/hooks/useForm';
import {
  createRecipe,
  getAllRecipes,
} from '../../../redux/actions/recipeActions';

const RecipePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { recipes } = useSelector((state) => state.recipeList);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  const { open, toggleOpen, handleClose } = useDialog(() => reset());

  const initialState = {
    recipeName: '',
    recipeDescription: '',
    servings: '',
    calories: '',
    cookTime: '',
    prepTime: '',
  };

  const {
    values: dialogValue,
    handleSubmit,
    handleChange,
    reset,
  } = useForm(initialState, () => {
    dispatch(createRecipe({ ...dialogValue, userId: currentUser._id }));
    handleClose();
  });

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => toggleOpen(true)}
        style={{ float: 'right' }}
      >
        + Recipe
      </Button>
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

      <PopupDialog
        open={open}
        title="Add a new recipe..."
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        content={
          <div className={classes.formContainer}>
            <Input
              value={dialogValue.recipeName}
              handleChange={handleChange}
              name="recipeName"
              label="Recipe Name"
            />
            <Input
              value={dialogValue.recipeDescription}
              handleChange={handleChange}
              name="recipeDescription"
              label="Recipe Description"
            />
            <Input
              value={dialogValue.calories}
              handleChange={handleChange}
              name="calories"
              label="Calories"
            />
            <Input
              value={dialogValue.servings}
              handleChange={handleChange}
              name="servings"
              label="Servings"
            />
            <Input
              value={dialogValue.prepTime}
              handleChange={handleChange}
              name="prepTime"
              label="Prep Time"
            />
            <Input
              value={dialogValue.cookTime}
              handleChange={handleChange}
              name="cookTime"
              label="Cook Time"
            />
          </div>
        }
      />
    </div>
  );
};

export default RecipePage;
