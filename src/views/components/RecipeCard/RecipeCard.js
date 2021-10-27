import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import useStyles from '../../../containers/styles';
import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FileInputComponent from 'react-file-input-previews-base64';
import Input from '../../common/Input/Input';
import RoundButton from '../../common/Buttons/RoundButton';
import useToggle from '../../../utils/hooks/useToggle';
import useForm from '../../../utils/hooks/useForm';
import { validate } from '../../../utils/validations/validate';
import {
  updateRecipe,
  deleteRecipe,
} from '../../../redux/actions/recipeActions';

const RecipeCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const history = useHistory();
  const [isInEditMode, toggleIsInEditMode] = useToggle(false);
  const initialForm = {
    recipeName: recipe.recipeName,
    recipeDescription: recipe.recipeDescription,
    calories: recipe.calories,
    servings: recipe.servings,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    recipeImage: recipe.recipeImage,
  };
  const {
    values: recipeForm,
    handleSubmit,
    handleChange,
    setValue: setRecipeForm,
    errors,
    reset,
  } = useForm(
    initialForm,
    () => {
      dispatch(updateRecipe(recipe._id, recipeForm));
      toggleIsInEditMode(false);
    },
    validate,
    ['recipeDescription', 'recipeImage']
  );

  const handleCancelEdit = () => {
    toggleIsInEditMode(false);
    reset();
  };

  const handleSelectFile = (file) => {
    setRecipeForm('recipeImage', file.base64);
  };

  const handleDeleteRecipe = (recipeId) => {
    dispatch(deleteRecipe(recipeId, history));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <>
            {!!recipeId && (
              <>
                <RoundButton
                  type="delete"
                  handleClick={() => handleDeleteRecipe(recipe._id)}
                />
                {isInEditMode ? (
                  <RoundButton type={'cancel'} handleClick={handleCancelEdit} />
                ) : (
                  <RoundButton type={'edit'} handleClick={toggleIsInEditMode} />
                )}
              </>
            )}
          </>
        }
        title={
          <Link to={{ pathname: `/recipes/${recipe._id}` }}>
            {recipe.recipeName}
          </Link>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={
          recipeForm?.recipeImage
            ? recipeForm?.recipeImage
            : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        alt={recipe.recipeName}
      />
      <CardContent>
        {!isInEditMode && (
          <div variant="body2" color="text.secondary">
            <Typography>Description: {recipe?.recipeDescription}</Typography>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography variant="h8">
                  Calories: {recipe?.calories}
                </Typography>
                <Typography>Servings: {recipe?.servings}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Prep Time: {recipe?.prepTime}</Typography>
                <Typography>Cook Time: {recipe?.cookTime}</Typography>
              </Grid>
            </Grid>
          </div>
        )}
        {isInEditMode && (
          <form className={classes.formContainer} onSubmit={handleSubmit}>
            <FileInputComponent
              labelText=""
              labelStyle={{ display: 'none' }}
              multiple={false}
              callbackFunction={(file) => {
                handleSelectFile(file);
              }}
              imagePreview={false}
              buttonComponent={
                <Button variant="outlined" color="primary">
                  Upload
                </Button>
              }
              accept="image/*"
              parentStyle={{ textAlign: 'center', margin: '10px' }}
            />
            <Input
              name="recipeDescription"
              label="Description"
              value={recipeForm?.recipeDescription}
              handleChange={handleChange}
              error={errors?.recipeDescription}
            />
            <Input
              name="calories"
              label="Calories"
              type="number"
              value={recipeForm?.calories}
              handleChange={handleChange}
              error={errors?.calories}
            />
            <Input
              name="servings"
              label="Servings"
              type="number"
              value={recipeForm?.servings}
              handleChange={handleChange}
              error={errors?.servings}
            />
            <Input
              name="prepTime"
              label="Prep Time"
              type="number"
              value={recipeForm?.prepTime}
              handleChange={handleChange}
              error={errors?.prepTime}
            />
            <Input
              name="cookTime"
              label="Cook Time"
              type="number"
              value={recipeForm?.cookTime}
              handleChange={handleChange}
              error={errors?.cookTime}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.formSubmitButton}
            >
              Submit
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
