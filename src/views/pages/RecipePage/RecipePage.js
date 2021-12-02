import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import useStyles from '../../../app/styles';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import PageNav from '../../common/PageNav/PageNav';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import IconWithTooltip from '../../common/IconWithTooltip/IconWithTooltip';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import RecipeList from '../../components/RecipeList/RecipeList';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import useInput from '../../../utils/hooks/useInput';
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
  const [tags, handleChangeTags, resetTags] = useInput();

  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      reset();
      resetTags();
    }
  );
  const {
    values: dialogValue,
    handleSubmit,
    handleChange,
    reset,
    errors,
  } = useForm(getInitialRecipeForm(false), () => {
    dispatch(
      createRecipe(
        {
          ...dialogValue,
          tags: tags !== '' ? tags.split(',').map((tag) => tag.trim()) : [],
          userId: loggedInUser._id,
        },
        history
      )
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
    queryFields,
  } = usePagination(
    { name: '', description: '', calories: '', tags: '', ingredients: '' },
    9,
    (value) =>
      dispatch(getAllRecipes(buildQuery(value), isInExploreMode, userId)),
    '&fields=userId,name,description,tags,calories,servings,time,servingSize,updatedTime,recipeImage'
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
        <Grid container spacing={3}>
          <Grid item sm={12} md={12} lg={9}>
            <div className={classes.utilsFields}>
              <Input
                value={queryFields.name}
                name="name"
                label="Name"
                handleChange={handleChangeQueryField}
              />
              <Input
                value={queryFields.description}
                name="description"
                label="Description"
                handleChange={handleChangeQueryField}
              />
              <InputWithTooltip
                value={queryFields.calories}
                name="calories"
                label="Calories Range"
                tooltip='Exact match, Ex: "2000", or separated by comma to search by range, Ex: "0, 2000" or "0," or ",2000"'
                handleChange={handleChangeQueryField}
              />
              <InputWithTooltip
                value={queryFields.tags}
                label="Tags"
                name="tags"
                tooltip='Separated by comma, Ex: "Main Course, Keto"'
                handleChange={handleChangeQueryField}
              />
              <InputWithTooltip
                value={queryFields.ingredients}
                label="Ingredients"
                name="ingredients"
                tooltip='Separated by comma, Ex: "Milk, Banana"'
                handleChange={handleChangeQueryField}
              />
            </div>
          </Grid>
          <Grid item sm={12} md={12} lg={3}>
            <div className={classes.utilsActions}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleSubmitFilter(currentCount)}
              >
                <SearchIcon fontSize="small" /> Search
              </Button>
              {loggedInUser && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => toggleOpenEditMode(true)}
                  >
                    <AddBoxOutlinedIcon fontSize="small" />
                    &nbsp;Recipe
                  </Button>
                  <Button
                    variant={isInExploreMode ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={handleChangeMode}
                  >
                    <ExploreOutlinedIcon fontSize="small" />
                    Explore
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        <RecipeList recipes={recipes} />
        {recipes.length !== 0 && (
          <PageNav
            count={count}
            page={page}
            handleChangePage={handleChangePage}
          />
        )}
        <PopupDialog
          open={openEditMode}
          title="Add a new recipe"
          handleClose={handleCloseEditMode}
          handleSubmit={handleSubmit}
          content={
            <div>
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
                  step={field.step}
                />
              ))}
              <Input
                InputLabelProps={{
                  style: { pointerEvents: 'auto' },
                }}
                label={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Tags&nbsp;
                    <IconWithTooltip title='Separated by comma, Ex: "Main Course, Keto"' />
                  </div>
                }
                value={tags}
                handleChange={handleChangeTags}
              />
            </div>
          }
        />
      </div>
    );
  return <Spinner />;
};

export default RecipePage;
