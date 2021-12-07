import {
  RECIPE_CREATE_REQUEST,
  RECIPE_CREATE_SUCCESS,
  RECIPE_CREATE_FAIL,
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FAIL,
  RECIPE_DETAILS_REQUEST,
  RECIPE_DETAILS_SUCCESS,
  RECIPE_DETAILS_FAIL,
  RECIPE_DELETE_REQUEST,
  RECIPE_DELETE_SUCCESS,
  RECIPE_DELETE_FAIL,
  RECIPE_UPDATE_REQUEST,
  RECIPE_UPDATE_SUCCESS,
  RECIPE_UPDATE_FAIL,
  RECIPE_SEARCH_LIST_REQUEST,
  RECIPE_SEARCH_LIST_SUCCESS,
  RECIPE_SEARCH_LIST_FAIL,
} from '../constants/recipeConstants';
import { addAlertWithTimeout } from '../actions/alertActions';
import * as api from '../../api/index';
import { errorMessage } from '../../constants/messages';

export {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipe,
  getAllRecipesForSearching,
};

// recipe list
const getAllRecipes =
  (
    query = '',
    isInExploreMode = false,
    userId = JSON.parse(localStorage.getItem('loggedInUser'))?._id
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: RECIPE_LIST_REQUEST });
      const { data } = await api.getRecipes(query, isInExploreMode, userId);
      dispatch({ type: RECIPE_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: RECIPE_LIST_FAIL,
        payload: error,
      });
      dispatch(
        addAlertWithTimeout(
          'error',
          error.response ? error.response.data.message : errorMessage
        )
      );
    }
  };

const getAllRecipesForSearching =
  (
    query = '',
    isInExploreMode = false,
    userId = JSON.parse(localStorage.getItem('loggedInUser'))?._id
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: RECIPE_SEARCH_LIST_REQUEST });
      const { data } = await api.getRecipes(query, isInExploreMode, userId);
      dispatch({ type: RECIPE_SEARCH_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: RECIPE_SEARCH_LIST_FAIL,
        payload: error,
      });
      dispatch(
        addAlertWithTimeout(
          'error',
          error.response ? error.response.data.message : errorMessage
        )
      );
    }
  };

// recipe details
const createRecipe =
  (recipe, router = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: RECIPE_CREATE_REQUEST });
      const { data } = await api.createRecipe(recipe);
      dispatch({ type: RECIPE_CREATE_SUCCESS, payload: data.data });
      if (router) {
        router.push({
          pathname: `/users/${recipe.userId}/recipes/${data.data._id}`,
          isRedirect: true,
          data: data.data,
        });
      }
      dispatch(addAlertWithTimeout('success', data.message));
    } catch (error) {
      dispatch({
        type: RECIPE_CREATE_FAIL,
        payload: error,
      });
      dispatch(
        addAlertWithTimeout(
          'error',
          error.response ? error.response.data.message : errorMessage
        )
      );
    }
  };

const getRecipe = (recipeId) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_DETAILS_REQUEST });
    const { data } = await api.getRecipe(recipeId);
    dispatch({ type: RECIPE_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: RECIPE_DETAILS_FAIL,
      payload: error,
    });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const deleteRecipe = (recipeId, router) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_DELETE_REQUEST });
    const { data } = await api.deleteRecipe(recipeId);
    dispatch({ type: RECIPE_DELETE_SUCCESS, payload: recipeId });
    router.push('/recipes');
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({
      type: RECIPE_DELETE_FAIL,
      payload: error,
    });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const updateRecipe = (recipeId, recipe) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_UPDATE_REQUEST });
    const { data } = await api.updateRecipe(recipeId, recipe);
    const payload = { ...recipe, ...data.data };
    dispatch({ type: RECIPE_UPDATE_SUCCESS, payload: payload });
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({
      type: RECIPE_UPDATE_FAIL,
      payload: error,
    });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};
