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
import {
  getInitialRecipeForm,
  recipeFormFields,
} from '../../../utils/forms/recipes';

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

  // create recipe dialog
  const { open, toggleOpen, handleClose } = useDialog(() => reset());
  const {
    values: dialogValue,
    handleSubmit,
    handleChange,
    reset,
    errors,
  } = useForm(
    getInitialRecipeForm(false),
    () => {
      dispatch(
        createRecipe({ ...dialogValue, userId: currentUser._id }, history)
      );
    },
    validate,
    ['recipeDescription', 'prepTime', 'cookTime']
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
  } = usePagination(getInitialRecipeForm(false), 12, (value) =>
    dispatch(getAllRecipes(buildQuery(value)))
  );

  return (
    <div>
      <div className={classes.utilsBar}>
        <div className={classes.utilsFields}>
          {recipeFormFields.map((field, fieldIdx) => (
            <Input
              key={`recipe-utils-${field.name}-${fieldIdx}`}
              name={field.name}
              label={field.label}
              handleChange={handleChangeQueryField}
              type={field.type ? field.type : 'text'}
            />
          ))}
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
            {recipeFormFields.map((field, fieldIdx) => (
              <Input
                key={`new-recipe-form-${field.name}-${fieldIdx}`}
                value={dialogValue[field.name]}
                handleChange={handleChange}
                name={field.name}
                label={field.label}
                error={errors[field.name]}
                type={field.type ? field.type : 'text'}
                required={field.required}
              />
            ))}
          </div>
        }
      />
    </div>
  );
};

export default RecipePage;
