import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Tooltip, Chip } from '@material-ui/core';
import useStyles from '../../../app/styles';
import { useHistory, useParams } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import Input from '../../common/Input/Input';
import AutocompleteTag from '../../common/AutocompleteTag/AutocompleteTag';
import RoundButton from '../../common/Buttons/RoundButton';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import CardList from '../../containers/CardList/CardList';
import PaginatedTable from '../../containers/PaginatedTable/PaginatedTable';
import usePagination from '../../../utils/hooks/usePagination';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import { validate } from '../../../utils/validations/validate';
import {
  getInitialRecipeForm,
  recipeFormFields,
} from '../../../utils/forms/recipes';
import views from '../../../constants/views';
import { updateUser } from '../../../redux/actions/userActions';
import {
  getAllRecipes,
  createRecipe,
  getAllRecipesInfinite,
  deleteRecipes,
} from '../../../redux/actions/recipeActions';

const RecipePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useHistory();
  const { loggedInUser, loadingUpdate } = useSelector((state) => state.user);
  const {
    loadingMore,
    loading,
    recipes,
    count: recipeCount,
    error,
    currentCount,
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
    sort,
    sortOrder,
    handleChangeSort,
  } = usePagination(
    { name: '', description: '', calories: '', tags: '', ingredients: '' },
    views[loggedInUser ? loggedInUser.recipeView : 'board'].limit,
    (newLimit, newPage = 0, newSort = sort, newSortOrder = sortOrder) => {
      if (view === 'board') {
        dispatch(
          getAllRecipesInfinite(
            buildQuery(limit, newPage, newSort, newSortOrder),
            isInExploreMode,
            userId
          )
        );
      } else {
        dispatch(
          getAllRecipes(
            buildQuery(newLimit, newPage, newSort, newSortOrder),
            isInExploreMode,
            userId
          )
        );
      }
    },
    '&fields=userId,name,description,tags,calories,servings,time,servingSize,updatedTime,recipeImage,ingredients',
    {
      tags: 'array',
      calories: 'number',
      ingredients: 'array',
    }
  );

  useEffect(() => {
    dispatch(
      getAllRecipes(
        buildQuery(limit, page, sort, sortOrder),
        isInExploreMode,
        userId
      )
    );
  }, []);

  // view
  const defaultView = loggedInUser ? loggedInUser.recipeView : 'board';
  const [view, setView] = useState(defaultView);
  const handleChangeView = () => {
    const newView = view === 'board' ? 'table' : 'board';
    setView(newView);
  };

  // explore mode
  const [isInExploreMode, toggleIsInExploreMode] = useToggle(false);
  const handleChangeMode = () => {
    toggleIsInExploreMode();
  };

  // set count for pagination when recipe list are updated
  useEffect(() => {
    handleChangePageCount(recipeCount);
  }, [recipeCount]);

  // set hasMore when recipe list are updated
  useEffect(() => {
    setHasMore(currentCount !== 0);
  }, [recipes]);

  // when changing view or isInExploreMode, make an api call to get recipe list with page 0 and new limit
  useEffect(() => {
    const newLimit = views[view].limit;
    handleChangeLimitAndPage(newLimit, 0, false);
    dispatch(
      getAllRecipes(
        buildQuery(newLimit, 0, sort, sortOrder),
        isInExploreMode,
        userId
      )
    );
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
          if (recipes.length >= limit) handleChangeLimitAndPage(limit, 'next');
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // set user default view
  const handleSetDefaultView = () => {
    dispatch(updateUser(loggedInUser._id, { recipeView: view }));
  };

  // create recipe dialog
  const [tags, setTags] = useState([]);
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      reset();
      setTags([]);
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
            tags,
            userId: loggedInUser._id,
          },
          history
        )
      );
    },
    validate,
    ['description', 'tags', 'time', 'servings', 'servingSize']
  );

  // delete recipes
  const handleClickDelete = (selected) => {
    dispatch(
      deleteRecipes(
        selected,
        loggedInUser,
        buildQuery(limit, 0, sort, sortOrder)
      )
    );
  };

  return (
    <div>
      {/* Change View */}
      <div style={{ float: 'right' }}>
        {loggedInUser && (
          <Tooltip
            title="Set current view as default"
            placement="top"
            style={{ marginRight: '8px' }}
          >
            <span>
              <RoundButton
                type="default"
                handleClick={handleSetDefaultView}
                loading={loadingUpdate}
              />
            </span>
          </Tooltip>
        )}
        <Button variant="contained" color="primary" onClick={handleChangeView}>
          {views[view].icon}
          &nbsp;{views[view].label} View
        </Button>
      </div>
      {/* search bar and action */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(
            getAllRecipes(
              buildQuery(limit, page, sort, sortOrder),
              isInExploreMode,
              userId
            )
          );
        }}
      >
        <Grid container spacing={3} style={{ marginBottom: '8px' }}>
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
                tooltip='Ex: "2000", or "0, 2000" or "0," or ",2000"'
                handleChange={handleChangeQueryField}
              />
              <InputWithTooltip
                value={queryFields.tags}
                label="Tags"
                name="tags"
                tooltip='Ex: "Main Course, Keto"'
                handleChange={handleChangeQueryField}
              />
              <InputWithTooltip
                value={queryFields.ingredients}
                label="Ingredients"
                name="ingredients"
                tooltip='Ex: "Milk, Banana"'
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
                onClick={() => handleSubmitFilter()}
              >
                <SearchIcon fontSize="small" />
                &nbsp;Search
              </Button>
              {loggedInUser && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={toggleOpenEditMode}
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
                    &nbsp;Explore
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </form>
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
          handleClickDelete={handleClickDelete}
          loadingMore={loadingMore}
          loading={loading}
          error={error}
          title="recipes"
          data={recipes}
          count={count}
          limit={limit}
          page={page}
          handleChangeLimitAndPage={handleChangeLimitAndPage}
          sort={sort}
          sortOrder={sortOrder}
          handleChangeSort={handleChangeSort}
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
                key={`new-recipe-form-field-${field.name}-${fieldIdx}`}
                name={field.name}
                label={field.label}
                value={dialogValue[field.name].toString()}
                handleChange={handleChange}
                error={errors[field.name]}
                required={field.required}
                type={field.type ? field.type : 'text'}
                step={field.step}
              />
            ))}
            <AutocompleteTag setTags={setTags} />
          </div>
        }
      />
    </div>
  );
};

export default RecipePage;
