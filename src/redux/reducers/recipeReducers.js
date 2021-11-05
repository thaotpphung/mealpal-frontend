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
};

const recipeListReducer = (state = RECIPE_LIST_INITIAL_STATE, action) => {
  switch (action.type) {
    case RECIPE_LIST_REQUEST:
    case RECIPE_CREATE_REQUEST:
      return { ...state, loading: true };

    case RECIPE_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        recipes: action.payload.data,
        count: action.payload.count,
        currentCount: action.payload.currentCount,
      };
    }

    case RECIPE_CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        recipes: [...state.recipes, action.payload],
      };
    }

    case RECIPE_LIST_FAIL:
    case RECIPE_CREATE_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};

const RECIPE_DETAILS_INITIAL_STATE = {
  recipe: {},
  loading: false,
};

const recipeDetailsReducer = (state = RECIPE_DETAILS_INITIAL_STATE, action) => {
  switch (action.type) {
    case RECIPE_DETAILS_REQUEST:
    case RECIPE_UPDATE_REQUEST:
    case RECIPE_DELETE_REQUEST:
      return { ...state, loading: true };

    case RECIPE_DETAILS_SUCCESS:
    case RECIPE_UPDATE_SUCCESS: {
      return { loading: false, recipe: { ...state.recipe, ...action.payload } };
    }

    case RECIPE_DETAILS_FAIL:
    case RECIPE_UPDATE_FAIL:
    case RECIPE_DELETE_FAIL:
    case RECIPE_DELETE_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export { recipeListReducer, recipeDetailsReducer };
