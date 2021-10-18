import {
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,
  WEEK_CREATE_REQUEST,
  WEEK_CREATE_SUCCESS,
  WEEK_CREATE_FAIL,
  WEEK_DELETE_REQUEST,
  WEEK_DELETE_SUCCESS,
  WEEK_DELETE_FAIL,
  WEEK_UPDATE_REQUEST,
  WEEK_UPDATE_SUCCESS,
  WEEK_UPDATE_FAIL,
} from '../constants/weekConstants';
import _ from 'lodash';

const INITIAL_STATE = {
  weeks: {},
  loading: false,
  error: null,
};

const weekListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // create week
    case WEEK_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case WEEK_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        weeks: {
          ...state.weeks,
          [action.payload._id]: action.payload,
        },
      };
    case WEEK_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // get all weeks
    case WEEK_LIST_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case WEEK_LIST_SUCCESS: {
      const weeks = _.mapKeys(action.payload.data, '_id');
      return {
        ...state,
        loading: false,
        weeks: weeks,
        error: null,
        count: action.payload.count,
      };
    }
    case WEEK_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    // delete week
    case WEEK_DELETE_REQUEST:
      return { ...state, loading: true, error: null };
    case WEEK_DELETE_SUCCESS: {
      const updatedWeeks = _.omit(state.weeks, action.payload);
      return { ...state, loading: false, weeks: updatedWeeks, error: null };
    }
    case WEEK_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // update week
    case WEEK_UPDATE_REQUEST:
      return { ...state, loading: true, error: null };
    case WEEK_UPDATE_SUCCESS: {
      const updatedWeeks = {
        ...state.weeks,
        [action.payload._id]: action.payload,
      };
      return { ...state, loading: false, weeks: updatedWeeks, error: null };
    }
    case WEEK_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default weekListReducer;
