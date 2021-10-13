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

import _ from 'lodash';

const INITIAL_STATE = {
  day: {},
  loading: false,
  error: null,
};

const mealListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // get meal
    case MEAL_LIST_SET:
      return { ...state, day: action.payload };

    // create meal
    case MEAL_CREATE_REQUEST:
      return { ...state, loading: true };
    case MEAL_CREATE_SUCCESS: {
      const updatedDay = _.cloneDeep(state.day);
      updatedDay.meals.push(action.payload);
      return { ...state, loading: false, day: updatedDay };
    }
    case MEAL_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // delete meal
    case MEAL_DELETE_REQUEST:
      return { ...state, loading: true };
    case MEAL_DELETE_SUCCESS: {
      const updatedDay = _.cloneDeep(state.day);
      const updatedMeals = updatedDay.meals.filter(
        (meal) => meal._id !== action.payload.mealId
      );
      updatedDay.meals = updatedMeals;
      return { ...state, loading: false, day: updatedDay };
    }
    case MEAL_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // update meal
    case MEAL_UPDATE_REQUEST:
      return { ...state, loading: true };
    case MEAL_UPDATE_SUCCESS: {
      const updatedDay = _.cloneDeep(state.day);
      updatedDay.meals[action.payload.mealIdx].food = action.payload.food;
      return { ...state, loading: false, day: updatedDay };
    }
    case MEAL_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default mealListReducer;
