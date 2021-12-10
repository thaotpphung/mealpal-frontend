import {
  RECIPE_CREATE_REQUEST,
  RECIPE_CREATE_SUCCESS,
  RECIPE_CREATE_FAIL,
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FAIL,
  RECIPE_LIST_DELETE_REQUEST,
  RECIPE_LIST_DELETE_SUCCESS,
  RECIPE_LIST_DELETE_FAIL,
  RECIPE_LIST_APPEND_REQUEST,
  RECIPE_LIST_APPEND_SUCCESS,
  RECIPE_LIST_APPEND_FAIL,
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
import cloneDeep from 'lodash/cloneDeep';

const RECIPE_LIST_INITIAL_STATE = {
  loadingMore: false,
  recipes: [],
  loading: false,
  count: 0,
  currentCount: 0,
  error: '',
};

const recipeListReducer = (state = RECIPE_LIST_INITIAL_STATE, action) => {
  switch (action.type) {
    case RECIPE_LIST_REQUEST:
    case RECIPE_LIST_DELETE_REQUEST:
      return { ...state, loading: true, error: '' };

    case RECIPE_LIST_APPEND_REQUEST:
      return { ...state, loadingMore: true, error: '' };

    case RECIPE_LIST_DELETE_SUCCESS:
    case RECIPE_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        recipes: action.payload.data,
        count: action.payload.count,
        currentCount: action.payload.currentCount,
        error: '',
      };
    }

    case RECIPE_LIST_APPEND_SUCCESS: {
      let updatedRecipes = cloneDeep(state.recipes);
      action.payload.data.forEach((item) => {
        updatedRecipes.push(item);
      });
      return {
        ...state,
        loadingMore: false,
        recipes: updatedRecipes,
        count: action.payload.count,
        currentCount: action.payload.currentCount,
        error: '',
      };
    }

    case RECIPE_LIST_FAIL:
    case RECIPE_LIST_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case RECIPE_LIST_APPEND_FAIL:
      return { ...state, loadingMore: false, error: action.payload };

    default:
      return state;
  }
};

const recipeSearchListReducer = (state = RECIPE_LIST_INITIAL_STATE, action) => {
  switch (action.type) {
    case RECIPE_SEARCH_LIST_REQUEST:
    case RECIPE_CREATE_REQUEST:
      return { ...state, loading: true, error: '' };

    case RECIPE_SEARCH_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        recipes: action.payload.data,
        error: '',
      };
    }

    case RECIPE_CREATE_SUCCESS: {
      let updatedRecipes = cloneDeep(state.recipes);
      updatedRecipes.push(action.payload);
      return {
        ...state,
        loading: false,
        recipes: [...state.recipes, action.payload],
        error: '',
      };
    }

    case RECIPE_SEARCH_LIST_FAIL:
    case RECIPE_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const RECIPE_DETAILS_INITIAL_STATE = {
  recipe: {},
  loading: false,
  error: '',
};

const recipeDetailsReducer = (state = RECIPE_DETAILS_INITIAL_STATE, action) => {
  switch (action.type) {
    case RECIPE_DETAILS_REQUEST:
    case RECIPE_DELETE_REQUEST:
    case RECIPE_CREATE_REQUEST:
      return { ...state, loading: true, error: '' };
    case RECIPE_UPDATE_REQUEST:
      return { ...state, loadingUpdate: true, error: '' };

    case RECIPE_DETAILS_SUCCESS:
    case RECIPE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipe: { ...state.recipe, ...action.payload },
        error: '',
      };

    case RECIPE_UPDATE_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
        recipe: { ...state.recipe, ...action.payload },
        error: '',
      };

    case RECIPE_DELETE_SUCCESS:
      return { ...state, loading: false, error: '' };

    case RECIPE_DETAILS_FAIL:
    case RECIPE_DELETE_FAIL:
    case RECIPE_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RECIPE_UPDATE_FAIL:
      return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
};

export { recipeListReducer, recipeDetailsReducer, recipeSearchListReducer };
