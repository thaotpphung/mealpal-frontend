import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import useStyles from '../../../containers/styles';
import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Button,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/AccessAlarm';
import FileInputComponent from 'react-file-input-previews-base64';
import Input from '../../common/Input/Input';
import RoundButton from '../../common/Buttons/RoundButton';
import useToggle from '../../../utils/hooks/useToggle';
import useForm from '../../../utils/hooks/useForm';

import {
  updateRecipe,
  deleteRecipe,
} from '../../../redux/actions/recipeActions';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const [expanded, setExpanded] = useState(false);
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
  } = useForm(initialForm, () => {
    dispatch(updateRecipe(recipe._id, recipeForm));
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSelectFile = (file) => {
    setRecipeForm('recipeImage', file.base64);
  };

  const handleDeleteRecipe = (recipeId) => {
    dispatch(deleteRecipe(recipeId));
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
                <RoundButton
                  type={isInEditMode ? 'done' : 'edit'}
                  handleClick={toggleIsInEditMode}
                />
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
            Description: {recipe?.recipeDescription}
            <Grid container>
              <Grid item xs={12} sm={6}>
                <div>Calories: {recipe?.calories}</div>
                <div>Servings: {recipe?.servings}</div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>Prep Time: {recipe?.prepTime}</div>
                <div>Cook Time: {recipe?.cookTime}</div>
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
            />
            <Input
              name="calories"
              label="Calories"
              value={recipeForm?.calories}
              handleChange={handleChange}
            />
            <Input
              name="servings"
              label="Servings"
              value={recipeForm?.servings}
              handleChange={handleChange}
            />
            <Input
              name="prepTime"
              label="Prep Time"
              value={recipeForm?.prepTime}
              handleChange={handleChange}
            />
            <Input
              name="cookTime"
              label="Cook Time"
              value={recipeForm?.cookTime}
              handleChange={handleChange}
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

      <CardActions disableSpacing>
        <RoundButton type="like" />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        Comment section
      </Collapse>
    </Card>
  );
};

export default RecipeCard;
