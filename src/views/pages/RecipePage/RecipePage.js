import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../../../app/styles';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import PageNav from '../../common/PageNav/PageNav';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import usePagination from '../../../utils/hooks/usePagination';
import {
  createRecipe,
  getAllRecipes,
} from '../../../redux/actions/recipeActions';
import {
  getInitialRecipeForm,
  recipeFormFields,
} from '../../../utils/forms/recipes';

const RecipePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);
  const {
    loading,
    recipes,
    count: recipeCount,
    currentCount,
    error,
  } = useSelector((state) => state.recipeList);

  // get initial weeks
  useEffect(() => {
    dispatch(getAllRecipes(buildQuery(), isInExploreMode, userId));
  }, []);

  useEffect(() => {
    setPageCount(recipeCount);
  }, [recipeCount]);

  // create recipe dialog
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => reset()
  );
  const {
    values: dialogValue,
    handleSubmit,
    handleChange,
    reset,
    errors,
  } = useForm(getInitialRecipeForm(false), () => {
    dispatch(
      createRecipe({ ...dialogValue, userId: loggedInUser._id }, history)
    );
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
  } = usePagination(
    getInitialRecipeForm(false),
    9,
    (value) =>
      dispatch(getAllRecipes(buildQuery(value), isInExploreMode, userId)),
    '&fields=userId,recipeName,recipeDescription,recipeDiet,calories,servings,time,servingSize,recipeImage,updatedTime'
  );

  // explore mode
  const [isInExploreMode, toggleIsInExploreMode] = useToggle(false);
  const handleChangeMode = () => {
    dispatch(getAllRecipes(buildQuery(undefined), !isInExploreMode, userId));
    toggleIsInExploreMode();
  };

  if (!loading && error) return <EmptyMessage />;

  if (!loading && recipes.length >= 0)
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
            {loggedInUser && (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => toggleOpenEditMode(true)}
                >
                  + Recipe
                </Button>
                <Button
                  variant={isInExploreMode ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={handleChangeMode}
                >
                  Explore
                </Button>
              </>
            )}
          </div>
        </div>
        {recipes.length === 0 ? (
          <EmptyMessage />
        ) : (
          <>
            <Grid
              className={classes.listContainer}
              container
              alignItems="stretch"
              spacing={3}
            >
              {recipes.map((recipe) => (
                <Grid key={recipe._id} item xs={12} sm={44} md={4}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))}
            </Grid>
            <PageNav
              count={count}
              page={page}
              handleChangePage={handleChangePage}
            />
          </>
        )}

        <PopupDialog
          open={openEditMode}
          title="Add a new recipe"
          handleClose={handleCloseEditMode}
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
  return <Spinner />;
};

export default RecipePage;
