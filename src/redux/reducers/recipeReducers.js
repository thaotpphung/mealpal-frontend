import {} from '../constants/recipeConstants';
import _ from 'lodash';
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

const RECIPE_LIST_INITIAL_STATE = {
  recipes: {},
  loading: false,
  error: null,
};

const recipeListReducer = (state = RECIPE_LIST_INITIAL_STATE, action) => {
  switch (action.type) {
    // create recipe
    case RECIPE_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case RECIPE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        recipes: { ...state.recipes, [action.payload._id]: action.payload },
      };
    case RECIPE_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // get all recipes
    case RECIPE_LIST_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case RECIPE_LIST_SUCCESS: {
      const recipes = _.mapKeys(action.payload, '_id');
      return { ...state, loading: false, recipes: recipes, error: null };
    }
    case RECIPE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const RECIPE_DETAILS_INITIAL_STATE = {
  recipe: {},
  loading: false,
  error: null,
};

const recipeDetailsReducer = (state = RECIPE_DETAILS_INITIAL_STATE, action) => {
  switch (action.type) {
    case RECIPE_DETAILS_REQUEST:
    case RECIPE_UPDATE_REQUEST:
      return { ...state, loading: true, error: null };
    case RECIPE_DETAILS_SUCCESS:
    case RECIPE_UPDATE_SUCCESS: {
      return { ...state, loading: false, recipe: action.payload, error: null };
    }
    case RECIPE_DETAILS_FAIL:
    case RECIPE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    //delete recipe
    case RECIPE_DELETE_REQUEST:
      return { ...state, loading: true, error: null };
    case RECIPE_DELETE_SUCCESS: {
      return { ...state, loading: false, recipe: {}, error: null };
    }
    case RECIPE_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { recipeListReducer, recipeDetailsReducer };
