import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
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
import { validate } from '../../../utils/validations/validate';

const RecipePage = () => {
  const classes = useStyles();
  const localClasses = styles();
  const history = useHistory();
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
    errors,
  } = useForm(
    initialState,
    () => {
      dispatch(
        createRecipe({ ...dialogValue, userId: currentUser._id }, history)
      );
    },
    validate,
    ['recipeDescription']
  );

  // pagination & filtering
  const {
    count,
    page,
    buildQuery,
    handleSubmitFilter,
    handleChangePage,
    handleChangeQueryField,
    setPageCount,
  } = usePagination(initialState, 12, (value) =>
    dispatch(getAllRecipes(buildQuery(value)))
  );

  return (
    <div>
      <div className={classes.utilsBar}>
        <div className={classes.utilsFields}>
          <Input
            name="recipeName"
            label="Recipe Name"
            handleChange={handleChangeQueryField}
          />
          <Input
            name="calories"
            label="Calories"
            type="number"
            handleChange={handleChangeQueryField}
          />
        </div>
        <div className={classes.utilsActions}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSubmitFilter(currentCount)}
          >
            <SearchIcon /> Search
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => toggleOpen(true)}
            style={{ float: 'right' }}
          >
            + Recipe
          </Button>
        </div>
      </div>

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
        title="Add a new recipe"
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        content={
          <div className={classes.formContainer}>
            <Input
              value={dialogValue.recipeName}
              handleChange={handleChange}
              name="recipeName"
              label="Recipe Name"
              error={errors?.recipeName}
            />
            <Input
              value={dialogValue.recipeDescription}
              handleChange={handleChange}
              name="recipeDescription"
              label="Recipe Description"
              error={errors?.recipeDescription}
            />
            <Input
              value={dialogValue.calories}
              handleChange={handleChange}
              name="calories"
              type="number"
              label="Calories"
              error={errors?.calories}
            />
            <Input
              value={dialogValue.servings}
              handleChange={handleChange}
              name="servings"
              type="number"
              label="Servings"
              error={errors?.servings}
            />
            <Input
              value={dialogValue.prepTime}
              handleChange={handleChange}
              name="prepTime"
              type="number"
              label="Prep Time"
              error={errors?.prepTime}
            />
            <Input
              value={dialogValue.cookTime}
              handleChange={handleChange}
              name="cookTime"
              type="number"
              label="Cook Time"
              error={errors?.cookTime}
            />
          </div>
        }
      />
    </div>
  );
};

export default RecipePage;
