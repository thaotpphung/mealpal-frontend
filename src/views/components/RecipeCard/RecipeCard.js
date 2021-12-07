import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  Chip,
} from '@material-ui/core';
import FileInputComponent from 'react-file-input-previews-base64';
import Input from '../../common/Input/Input';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import RoundButton from '../../common/Buttons/RoundButton';
import BlockButton from '../../common/Buttons/BlockButton';
import useEditMode from '../../../utils/hooks/useEditMode';
import useInput from '../../../utils/hooks/useInput';
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

const RecipeCard = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const { loggedInUser } = useSelector((state) => state.user);
  const history = useHistory();
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      reset();
      resetTags();
    }
  );
  const initialForm = {
    ...getInitialRecipeForm(true, data),
  };

  const [tags, handleChangeTags, resetTags] = useInput(
    data.tags.join(', ').replace(/, ([^,]*)$/, ', $1')
  );

  const {
    values: recipeForm,
    handleSubmit,
    handleChange,
    setValue: setRecipeForm,
    errors,
    reset,
  } = useForm(initialForm, () => {
    dispatch(
      updateRecipe(data._id, {
        ...recipeForm,
        tags: tags !== '' ? tags.split(',').map((tag) => tag.trim()) : [],
      })
    );
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
      {loggedInUser &&
        data?.userId._id === loggedInUser._id && [
          <MenuItem
            key="addCart"
            onClick={() => {
              dispatch(addToCartByRecipe(data, history));
            }}
          >
            <RoundButton type="shoppingCart" />
            <Typography>Add To Cart</Typography>
          </MenuItem>,
          <MenuItem
            key="deleteCart"
            onClick={() => {
              handleDeleteRecipe(data._id);
            }}
          >
            <RoundButton type="delete" />
            <Typography>Delete</Typography>
          </MenuItem>,
        ]}
      {loggedInUser && data?.userId._id !== loggedInUser._id && (
        <MenuItem
          key="saveRecipe"
          onClick={() => handleDuplicateRecipe(data._id)}
        >
          <RoundButton type="save" />
          <Typography>Save</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={data.userId?.avatar}
          />
        }
        action={
          <>
            {/* single recipe view*/}
            {loggedInUser && recipeId && (
              <>
                {data.userId._id === loggedInUser._id && (
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
          <Typography
            className={classes.clickable}
            onClick={() =>
              history.push(`/users/${data.userId._id}/recipes/${data._id}`)
            }
          >
            {data.name}
          </Typography>
        }
        subheader={`Last Updated ${formatTime(data.updatedTime)}`}
      />
      <CardMedia
        component="img"
        height="200"
        image={
          recipeForm.recipeImage
            ? recipeForm.recipeImage
            : data.recipeImage?.url
            ? data.recipeImage.url
            : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        alt={data.name}
      />

      <CardContent>
        {!openEditMode && (
          <div>
            <Grid container spacing={1} alignItems="stretch">
              <Grid item xs={12} lg={12}>
                <Typography className={classes.wordBreak}>
                  <strong>Description:</strong> {data?.description}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>
                  <strong>Calories:</strong> {data?.calories} kCal
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>
                  <strong>Servings:</strong> {data?.servings}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>
                  <strong>Time (mins):</strong> {data?.time}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>
                  <strong>Serving Size:</strong> {data?.servingSize}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography component="span">
                  <strong>Creator: </strong>
                </Typography>
                <Typography
                  component="span"
                  className={classes.clickable}
                  onClick={() =>
                    history.push(`/users/${data.userId._id}/profile`)
                  }
                >
                  {data.userId.username}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography component="span">
                  <strong>Tags: </strong>
                </Typography>
                {data.tags.map((tag, tagIdx) => (
                  <Chip
                    size="small"
                    key={`tag-${tagIdx}`}
                    label={tag}
                    className={classes.tag}
                  />
                ))}
              </Grid>
            </Grid>
          </div>
        )}
        {openEditMode && (
          <>
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
                  value={recipeForm[field.name].toString()}
                  handleChange={handleChange}
                  error={errors[field.name]}
                  type={field.type ? field.type : 'text'}
                  required={field.required}
                  multiline
                  minRows={field.name === 'description' ? 4 : 0}
                />
              ))}
              <InputWithTooltip
                label="Tags"
                tooltip='Separated by comma, Ex: "Main Course, Chicken, Keto"'
                multiline
                minRows={4}
                value={tags}
                handleChange={handleChangeTags}
              />
              <BlockButton type="submit" fullWidth>
                Submit
              </BlockButton>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
