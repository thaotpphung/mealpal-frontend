import {
  MEAL_LIST_SET,
  MEAL_CREATE_REQUEST,
  MEAL_CREATE_SUCCESS,
  MEAL_CREATE_FAIL,
  MEAL_DELETE_REQUEST,
  MEAL_DELETE_SUCCESS,
  MEAL_DELETE_FAIL,
  MEAL_UPDATE_REQUEST,
  MEAL_UPDATE_SUCCESS,
  MEAL_UPDATE_FAIL,
} from '../constants/mealConstants';
import * as api from '../../api/index';

export { setMeals, createMeal, deleteMeal, updateMeal };

const setMeals = (meals) => async (dispatch) => {
  dispatch({ type: MEAL_LIST_SET, payload: meals });
};

const createMeal = (meal) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_CREATE_REQUEST });
    const { data } = await api.createMeal(meal);
    dispatch({ type: MEAL_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MEAL_CREATE_FAIL, payload: error.response.data.message });
  }
};

const deleteMeal = (mealId, dayId) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_DELETE_REQUEST });
    await api.deleteMeal(mealId);
    dispatch({ type: MEAL_DELETE_SUCCESS, payload: { mealId, dayId } });
  } catch (error) {
    dispatch({ type: MEAL_DELETE_FAIL, payload: error.response.data.message });
  }
};

const updateMeal =
  (mealId, food, mealIdx, dayId, foodFromRecipe) => async (dispatch) => {
    try {
      dispatch({ type: MEAL_UPDATE_REQUEST });
      const { data } = await api.updateMeal(mealId, { food, foodFromRecipe });
      dispatch({
        type: MEAL_UPDATE_SUCCESS,
        payload: { food: data.data, mealId, mealIdx, dayId },
      });
    } catch (error) {
      dispatch({
        type: MEAL_UPDATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
