import {
  RECIPE_CREATE_REQUEST,
  RECIPE_CREATE_SUCCESS,
  RECIPE_CREATE_FAIL,
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FAIL,
  RECIPE_DELETE_REQUEST,
  RECIPE_DELETE_SUCCESS,
  RECIPE_DELETE_FAIL,
} from '../constants/recipeConstants';
import * as api from '../../api/index';

export { getAllRecipes, createRecipe, deleteRecipe };

const createRecipe = (recipe) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_CREATE_REQUEST, payload: recipe });
    const { data } = await api.createRecipe(recipe);
    dispatch({ type: RECIPE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RECIPE_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const getAllRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_LIST_REQUEST });
    const { data } = await api.getRecipes();
    dispatch({ type: RECIPE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RECIPE_LIST_FAIL, payload: error.response.data.message });
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
