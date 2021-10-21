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
} from '../constants/recipeConstants';
import * as api from '../../api/index';

export { getAllRecipes, createRecipe, deleteRecipe, updateRecipe, getRecipe };

const createRecipe = (recipe, router) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_CREATE_REQUEST, payload: recipe });
    const { data } = await api.createRecipe(recipe);
    dispatch({ type: RECIPE_CREATE_SUCCESS, payload: data.data });
    router.push(`/recipes/${data.data._id}`);
  } catch (error) {
    dispatch({
      type: RECIPE_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const getAllRecipes =
  (query = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: RECIPE_LIST_REQUEST });
      const { data } = await api.getRecipes(query);
      dispatch({ type: RECIPE_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: RECIPE_LIST_FAIL,
        payload: error.response.data.message,
      });
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
      payload: error.response.data.message,
    });
  }
};

const deleteRecipe = (recipeId) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_DELETE_REQUEST });
    await api.deleteRecipe(recipeId);
    dispatch({ type: RECIPE_DELETE_SUCCESS, payload: recipeId });
  } catch (error) {
    dispatch({
      type: RECIPE_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const updateRecipe = (recipeId, recipe) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_UPDATE_REQUEST });
    const { data } = await api.updateRecipe(recipeId, recipe);
    dispatch({ type: RECIPE_UPDATE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: RECIPE_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
