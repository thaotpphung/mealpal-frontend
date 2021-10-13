import {} from '../constants/recipeConstants';
import _ from 'lodash';
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
  RECIPE_UPDATE_REQUEST,
  RECIPE_UPDATE_SUCCESS,
  RECIPE_UPDATE_FAIL,
} from '../constants/recipeConstants';

const INITIAL_STATE = {
  recipes: {},
  loading: false,
  error: null,
};

const recipeListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // create recipe
    case RECIPE_CREATE_REQUEST:
      return { ...state, loading: true };
    case RECIPE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: { ...state.recipes, [action.payload._id]: action.payload },
      };
    case RECIPE_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // get all recipes
    case RECIPE_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case RECIPE_LIST_SUCCESS: {
      const recipes = _.mapKeys(action.payload, '_id');
      return { ...state, loading: false, recipes: recipes };
    }
    case RECIPE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    // delete recipe
    case RECIPE_DELETE_REQUEST:
      return { ...state, loading: true };
    case RECIPE_DELETE_SUCCESS: {
      const updatedRecipes = _.omit(state.recipes, action.payload);
      return { ...state, loading: false, recipes: updatedRecipes };
    }
    case RECIPE_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // update recipe
    case RECIPE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case RECIPE_UPDATE_SUCCESS: {
      console.log(action.payload);
      const updatedRecipes = {
        ...state.recipes,
        [action.payload._id]: action.payload,
      };
      return { ...state, loading: false, recipes: updatedRecipes };
    }
    case RECIPE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default recipeListReducer;
