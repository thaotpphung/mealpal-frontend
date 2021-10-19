import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Button, IconButton, FormControl } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../../../containers/styles';
import { styles } from './styles';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import Input from '../../common/Input/Input';
import useDialog from '../../../utils/hooks/useDialog';
import useForm from '../../../utils/hooks/useForm';
import usePagination from '../../../utils/hooks/usePagination';
import {
  createRecipe,
  getAllRecipes,
} from '../../../redux/actions/recipeActions';

const RecipePage = () => {
  const classes = useStyles();
  const localClasses = styles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const {
    recipes,
    count: recipeCount,
    currentCount,
  } = useSelector((state) => state.recipeList);

  // get initial weeks
  useEffect(() => {
    dispatch(getAllRecipes(buildQuery()));
  }, []);

  useEffect(() => {
    setPageCount(recipeCount);
  }, [recipeCount]);

  const initialState = {
    recipeName: '',
    recipeDescription: '',
    servings: '',
    calories: '',
    cookTime: '',
    prepTime: '',
  };

  // create recipe dialog
  const { open, toggleOpen, handleClose } = useDialog(() => reset());
  const {
    values: dialogValue,
    handleSubmit,
    handleChange,
    reset,
  } = useForm(initialState, () => {
    dispatch(createRecipe({ ...dialogValue, userId: currentUser._id }));
    handleClose();
  });

  // pagination & filtering
  const {
    count,
    page,
    buildQuery,
    handleSubmitFilter,
    handleChangePage,
    handleChangeQueryField,
    setPageCount,
  } = usePagination(initialState, 12, () =>
    dispatch(getAllRecipes(buildQuery()))
  );

  return (
    <div>
      <div className={classes.utilsBar}>
        <FormControl className={localClasses.formControl}>
          <Input
            name="recipeName"
            label="Recipe Name"
            handleChange={handleChangeQueryField}
          />
        </FormControl>
        <FormControl className={localClasses.formControl}>
          <Input
            name="calories"
            label="Calories"
            handleChange={handleChangeQueryField}
          />
        </FormControl>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSubmitFilter(currentCount)}
        >
          <SearchIcon /> Search
        </Button>
      </div>

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
      <Pagination
        count={count}
        page={page}
        boundaryCount={2}
        onChange={handleChangePage}
        className={classes.pagination}
        showLastButton
        showFirstButton
      />

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
              required
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
