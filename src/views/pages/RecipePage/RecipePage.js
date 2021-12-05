import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Button, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import useStyles from '../../../app/styles';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import RoundButton from '../../common/Buttons/RoundButton';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import RecipeList from '../../containers/RecipeList/RecipeList';
import PaginatedTable from '../../containers/PaginatedTable/PaginatedTable';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import useInput from '../../../utils/hooks/useInput';
import useToggle from '../../../utils/hooks/useToggle';
import usePagination from '../../../utils/hooks/usePagination';
import {
  createRecipe,
  getAllRecipes,
} from '../../../redux/actions/recipeActions';
import { updateUser } from '../../../redux/actions/userActions';
import {
  getInitialRecipeForm,
  recipeFormFields,
} from '../../../utils/forms/recipes';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';

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

  // pagination & filtering
  const {
    pageCount,
    count,
    page,
    limit,
    buildQuery,
    handleSubmitFilter,
    handleChangePage,
    handleChangeLimit,
    handleChangeQueryField,
    handleChangePageCount,
    handleChangePageAndLimit,
    queryFields,
  } = usePagination(
    { name: '', description: '', calories: '', tags: '', ingredients: '' },
    (loggedInUser ? loggedInUser.recipeView : 'board') === 'table' ? 0 : 1,
    (loggedInUser ? loggedInUser.recipeView : 'board') === 'table' ? 5 : 9,
    (page = 0, newLimit = limit) => {
      let newPage = view ? page + 1 : page;
      dispatch(
        getAllRecipes(buildQuery(newPage, newLimit), isInExploreMode, userId)
      );
    },
    '&fields=userId,name,description,tags,calories,servings,time,servingSize,updatedTime,recipeImage'
  );

  // view
  const defaultView = loggedInUser ? loggedInUser.recipeView : 'board';
  const [view, toggleView] = useToggle(defaultView === 'board' ? false : true); // initially the view is board view
  const handleChangeView = () => {
    if (view) {
      handleChangePageAndLimit(1, 9);
      dispatch(getAllRecipes(buildQuery(1, 9), isInExploreMode, userId));
      handleChangePageCount(recipeCount, 9);
    } else {
      handleChangePageAndLimit(0, 5);
      dispatch(getAllRecipes(buildQuery(1, 5), isInExploreMode, userId));
      handleChangePageCount(recipeCount, 5);
    }
    toggleView();
  };
  const handleSetDefaultView = () => {
    dispatch(
      updateUser(loggedInUser._id, { recipeView: view ? 'table' : 'board' })
    );
  };

  // get initial recipes
  useEffect(() => {
    if ((loggedInUser ? loggedInUser.recipeView : 'board') === 'table') {
      handleChangePageAndLimit(0, 5);
    }
    dispatch(
      getAllRecipes(
        buildQuery(
          1,
          (loggedInUser ? loggedInUser.recipeView : 'board') === 'table' ? 5 : 9
        ),
        isInExploreMode,
        userId
      )
    );
  }, []);

  // set count for pagination when recipes have been loaded or a query has been submitted
  useEffect(() => {
    handleChangePageCount(
      recipeCount,
      (loggedInUser ? loggedInUser.recipeView : 'board') === 'table' ? 5 : 9
    );
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

  // explore mode
  const [isInExploreMode, toggleIsInExploreMode] = useToggle(false);
  const handleChangeMode = () => {
    dispatch(
      getAllRecipes(buildQuery(1, view ? 5 : 9), !isInExploreMode, userId)
    );
    toggleIsInExploreMode();
  };

  if (!loading && error) return <EmptyMessage />;

  if (!loading && recipes.length >= 0)
    return (
      <div>
        {/* Change View */}
        <div style={{ float: 'right' }}>
          {loggedInUser && (
            <Tooltip
              style={{ marginRight: '8px' }}
              title="Set current view as default"
              placement="top"
            >
              <span>
                <RoundButton
                  type="default"
                  handleClick={handleSetDefaultView}
                />
              </span>
            </Tooltip>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangeView}
          >
            {view ? (
              <ViewModuleIcon fontSize="small" />
            ) : (
              <ViewListIcon fontSize="small" />
            )}
            &nbsp;{view ? 'Board' : 'Table'} View
          </Button>
        </div>
        <Grid container spacing={3} style={{ marginBottom: '12px' }}>
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
                label="Calories"
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
        {/* recipes */}
        {!view ? (
          <RecipeList
            recipes={recipes}
            count={pageCount}
            page={page}
            handleChangePage={handleChangePage}
          />
        ) : (
          <PaginatedTable
            title="recipes"
            data={recipes}
            count={count}
            limit={limit}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeLimit={handleChangeLimit}
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
              <InputWithTooltip
                label="Tags"
                tooltip='Separated by comma, Ex: "Main Course, Keto"'
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
