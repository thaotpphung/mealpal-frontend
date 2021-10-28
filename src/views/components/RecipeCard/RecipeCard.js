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
import { red } from '@material-ui/core/colors';
import FileInputComponent from 'react-file-input-previews-base64';
import Input from '../../common/Input/Input';
import RoundButton from '../../common/Buttons/RoundButton';
import useToggle from '../../../utils/hooks/useToggle';
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
  const { currentUser } = useSelector((state) => state.user);
  const history = useHistory();
  const [isInEditMode, toggleIsInEditMode] = useToggle(false);
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
    toggleIsInEditMode(false);
  });

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
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={currentUser.avatar}
          />
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
        {!isInEditMode && (
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
