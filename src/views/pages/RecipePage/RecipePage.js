import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Button, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import useStyles from '../../../app/styles';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import Input from '../../common/Input/Input';
import RoundButton from '../../common/Buttons/RoundButton';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import CardList from '../../containers/CardList/CardList';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import PaginatedTable from '../../containers/PaginatedTable/PaginatedTable';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import useInput from '../../../utils/hooks/useInput';
import useToggle from '../../../utils/hooks/useToggle';
import usePagination from '../../../utils/hooks/usePagination';
import { validate } from '../../../utils/validations/validate';
import {
  createRecipe,
  getAllRecipes,
  getAllRecipesInfinite,
} from '../../../redux/actions/recipeActions';
import { updateUser } from '../../../redux/actions/userActions';
import {
  getInitialRecipeForm,
  recipeFormFields,
} from '../../../utils/forms/recipes';
import views from '../../../constants/views';

const RecipePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);
  const {
    loadingMore,
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
    handleChangeQueryField,
    handleChangePageCount,
    handleChangeLimitAndPage,
    queryFields,
  } = usePagination(
    { name: '', description: '', calories: '', tags: '', ingredients: '' },
    views[loggedInUser ? loggedInUser.weekView : 'board'].limit,
    (newLimit, newPage = 0) => {
      if (view === 'board') {
        dispatch(
          getAllRecipesInfinite(
            buildQuery(limit, page),
            isInExploreMode,
            userId
          )
        );
      } else {
        dispatch(
          getAllRecipes(buildQuery(newLimit, newPage), isInExploreMode, userId)
        );
      }
    },
    '&fields=userId,name,description,tags,calories,servings,time,servingSize,updatedTime,recipeImage'
  );

  // view
  const defaultView = loggedInUser ? loggedInUser.recipeView : 'board';
  const [view, setView] = useState(defaultView);
  const handleChangeView = () => {
    setView(view === 'board' ? 'table' : 'board');
  };
  const handleSetDefaultView = () => {
    dispatch(updateUser(loggedInUser._id, { recipeView: view }));
  };

  // explore mode
  const [isInExploreMode, toggleIsInExploreMode] = useToggle(false);
  const handleChangeMode = () => {
    toggleIsInExploreMode();
  };

  // set count for pagination when weeks have been loaded
  useEffect(() => {
    handleChangePageCount(recipeCount);
    setHasMore(recipes.length < recipeCount);
  }, [recipeCount]);

  useEffect(() => {
    setHasMore(currentCount !== 0);
  }, [recipes]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!firstUpdate.current) {
      const newLimit = views[view].limit;
      handleChangeLimitAndPage(newLimit, 0, false);
      dispatch(getAllRecipes(buildQuery(newLimit), isInExploreMode, userId));
    }
  }, [view, isInExploreMode]);

  // infinite strolling
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleChangeLimitAndPage(limit, 'next');
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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
  } = useForm(
    getInitialRecipeForm(false),
    () => {
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
    },
    validate,
    ['description', 'tags']
  );

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
              <RoundButton type="default" handleClick={handleSetDefaultView} />
            </span>
          </Tooltip>
        )}
        <Button variant="contained" color="primary" onClick={handleChangeView}>
          {views[view].icon}
          &nbsp;{views[view].label} View
        </Button>
      </div>
      <Grid container spacing={3} style={{ marginBottom: '12px' }}>
        <Grid item xs={12} lg={9}>
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
        <Grid item xs={12} lg={3}>
          <div className={classes.utilsActions}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => handleSubmitFilter(currentCount)}
            >
              <SearchIcon fontSize="small" />
              &nbsp;Search
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
      {view === 'board' ? (
        <CardList
          component={RecipeCard}
          loading={loading}
          error={error}
          lastElementRef={lastElementRef}
          data={recipes}
          count={pageCount}
          page={page}
          handleChangeLimitAndPage={handleChangeLimitAndPage}
        />
      ) : (
        <PaginatedTable
          loadingMore={loadingMore}
          loading={loading}
          error={error}
          title="recipes"
          data={recipes}
          count={count}
          limit={limit}
          page={page}
          handleChangeLimitAndPage={handleChangeLimitAndPage}
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
};

export default RecipePage;
