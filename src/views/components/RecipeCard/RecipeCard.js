import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import FileInputComponent from 'react-file-input-previews-base64';
import Input from '../../common/Input/Input';
import RoundButton from '../../common/Buttons/RoundButton';
import BlockButton from '../../common/Buttons/BlockButton';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import {
  updateRecipe,
  deleteRecipe,
} from '../../../redux/actions/recipeActions';
import {
  getInitialRecipeForm,
  recipeFormFields,
} from '../../../utils/forms/recipes';

const RecipeCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const history = useHistory();
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => reset()
  );
  const initialForm = {
    ...getInitialRecipeForm(true, recipe),
    recipeImage: recipe.recipeImage,
  };
  const {
    values: recipeForm,
    handleSubmit,
    handleChange,
    setValue: setRecipeForm,
    errors,
    reset,
  } = useForm(initialForm, () => {
    dispatch(updateRecipe(recipe._id, recipeForm));
    toggleOpenEditMode(false);
  });

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
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={recipe.userId.avatar}
          />
        }
        action={
          <>
            {!!recipeId && (
              <>
                <RoundButton type="shoppingCart" />
                <RoundButton
                  type="delete"
                  handleClick={() => handleDeleteRecipe(recipe._id)}
                />
                {openEditMode ? (
                  <RoundButton
                    type={'cancel'}
                    handleClick={handleCloseEditMode}
                  />
                ) : (
                  <RoundButton type={'edit'} handleClick={toggleOpenEditMode} />
                )}
              </>
            )}
          </>
        }
        title={
          <Link to={{ pathname: `/recipes/${recipe._id}` }}>
            <Typography>{recipe.recipeName}</Typography>
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
        {!openEditMode && (
          <div>
            <Typography>Description: {recipe?.recipeDescription}</Typography>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography>Calories: {recipe?.calories}</Typography>
                <Typography>Servings: {recipe?.servings}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Prep (mins): {recipe?.prepTime}</Typography>
                <Typography>Cook (mins): {recipe?.cookTime}</Typography>
              </Grid>
            </Grid>
          </div>
        )}
        {openEditMode && (
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
            {recipeFormFields.map((field, fieldIdx) => (
              <Input
                key={`recipe-update-form-${field.name}-${fieldIdx}`}
                name={field.name}
                label={field.label}
                value={recipeForm[field.name]}
                handleChange={handleChange}
                error={errors[field.name]}
                type={field.type ? field.type : 'text'}
                required={field.required}
              />
            ))}
            <BlockButton type="submit" />
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
