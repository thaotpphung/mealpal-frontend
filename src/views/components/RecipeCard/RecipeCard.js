import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../app/styles';
import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import FileInputComponent from 'react-file-input-previews-base64';
import Input from '../../common/Input/Input';
import RoundButton from '../../common/Buttons/RoundButton';
import BlockButton from '../../common/Buttons/BlockButton';
import useEditMode from '../../../utils/hooks/useEditMode';
import { formatTime } from '../../../utils/time';
import useForm from '../../../utils/hooks/useForm';
import {
  updateRecipe,
  deleteRecipe,
  createRecipe,
} from '../../../redux/actions/recipeActions';
import { addToCartByRecipe } from '../../../redux/actions/cartActions';
import {
  getInitialRecipeForm,
  recipeFormFields,
} from '../../../utils/forms/recipes';

const RecipeCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const { loggedInUser } = useSelector((state) => state.user);
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

  const handleDuplicateRecipe = (recipeId) => {
    dispatch(createRecipe({ recipeId }, history));
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const mobileMenuId = 'primary-menu-mobile';
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {recipe?.userId._id === loggedInUser._id ? (
        [
          <MenuItem
            key="addCart"
            onClick={() => {
              dispatch(addToCartByRecipe(recipe, history));
            }}
          >
            <RoundButton type="shoppingCart" />
            <Typography>Add To Cart</Typography>
          </MenuItem>,
          <MenuItem
            key="deleteCart"
            onClick={() => {
              handleDeleteRecipe(recipe._id);
            }}
          >
            <RoundButton type="delete" />
            <Typography>Delete</Typography>
          </MenuItem>,
        ]
      ) : (
        <MenuItem
          key="saveWeek"
          onClick={() => handleDuplicateRecipe(recipeId)}
        >
          <RoundButton type="save" />
          <Typography>Save</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={recipe.userId?.avatar}
          />
        }
        action={
          <>
            {/* single recipe view*/}
            {loggedInUser && recipeId && (
              <>
                {recipe.userId._id === loggedInUser._id && (
                  <>
                    <>
                      {openEditMode ? (
                        <RoundButton
                          type={'cancel'}
                          handleClick={handleCloseEditMode}
                        />
                      ) : (
                        <RoundButton
                          type={'edit'}
                          handleClick={toggleOpenEditMode}
                        />
                      )}
                    </>
                  </>
                )}
                <RoundButton
                  type="more"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  handleClick={handleMobileMenuOpen}
                />
              </>
            )}
            {renderMobileMenu}
          </>
        }
        title={
          <Link to={{ pathname: `/recipes/${recipe._id}` }}>
            <Typography>{recipe.recipeName}</Typography>
          </Link>
        }
        subheader={`Last Updated ${formatTime(recipe.updatedTime)}`}
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
            <Grid container spacing={1} alignItems="stretch">
              <Grid item xs={12} sm={12}>
                <Typography>
                  <strong>Description:</strong> {recipe?.recipeDescription}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>Calories:</strong> {recipe?.calories} kCal
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>Servings:</strong> {recipe?.servings}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>Diet:</strong> {recipe?.recipeDiet}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>Serving Size:</strong> {recipe?.servingSize}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>Time (mins):</strong> {recipe?.time}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography component="span">
                  <strong>Creator: </strong>
                  <Link
                    to={{ pathname: `/users/${recipe.userId._id}/profile` }}
                  >
                    {recipe.userId.username}
                  </Link>
                </Typography>
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
            <BlockButton type="submit" fullWidth>
              Submit
            </BlockButton>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
