import {
  DAY_LIST_REQUEST,
  DAY_LIST_SUCCESS,
  DAY_LIST_FAIL,
} from '../constants/dayConstants';

import {
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
  days: {},
  loading: false,
  error: null,
};

const dayListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // get all days of a week
    case DAY_LIST_REQUEST:
      return { ...state, loading: true };
    case DAY_LIST_SUCCESS: {
      const days = _.mapKeys(action.payload, '_id');
      return { ...state, loading: false, days: days };
    }
    case DAY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    // create meal
    case MEAL_CREATE_REQUEST:
      return { ...state, loading: true };
    case MEAL_CREATE_SUCCESS: {
      const copyState = _.cloneDeep(state.days);
      const meals = copyState[action.payload.dayId].meals;
      meals.push(action.payload);
      const days = {
        ...copyState,
        [action.payload.dayId]: {
          ...copyState[action.payload.dayId],
          meals: meals,
        },
      };
      return { ...state, loading: false, days: days };
    }
    case MEAL_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // delete meal
    case MEAL_DELETE_REQUEST:
      return { ...state, loading: true };
    case MEAL_DELETE_SUCCESS: {
      const copyState = _.cloneDeep(state.days);
      const meals = copyState[action.payload.dayId].meals.filter(
        (meal) => meal._id !== action.payload.mealId
      );
      const days = {
        ...copyState,
        [action.payload.dayId]: {
          ...copyState[action.payload.dayId],
          meals: meals,
        },
      };
      return { ...state, loading: false, days: days };
    }
    case MEAL_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // update meal (add food)
    case MEAL_UPDATE_REQUEST:
      return { ...state, loading: true };
    case MEAL_UPDATE_SUCCESS: {
      const copyState = _.cloneDeep(state.days);
      const updatedMeals = copyState[action.payload.dayId].meals;
      action.payload.food.forEach((foodItem) => {
        updatedMeals[action.payload.mealIdx].food.push(foodItem);
      });
      const days = {
        ...copyState,
        [action.payload.dayId]: {
          ...copyState[action.payload.dayId],
          meals: updatedMeals,
        },
      };
      return { ...state, loading: false, days: days };
    }
    case MEAL_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default dayListReducer;
