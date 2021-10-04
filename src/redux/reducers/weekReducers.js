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
  WEEK_SET_SELECTED,
} from '../constants/weekConstants';
import _ from 'lodash';

const INITIAL_STATE = {
  weeks: {},
  loading: false,
  error: null,
  selectedWeek: null,
};

const weekListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WEEK_CREATE_REQUEST:
      return { ...state, loading: true };
    case WEEK_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        weeks: { ...state.weeks, [action.payload._id]: action.payload },
      };
    case WEEK_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case WEEK_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case WEEK_LIST_SUCCESS: {
      const weeks = _.mapKeys(action.payload, '_id');
      return { ...state, loading: false, weeks: weeks };
    }
    case WEEK_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    // delete week
    case WEEK_DELETE_REQUEST:
      return { ...state, loading: true };
    case WEEK_DELETE_SUCCESS: {
      const updatedWeeks = _.omit(state.weeks, action.payload);
      return { ...state, loading: false, weeks: updatedWeeks };
    }
    case WEEK_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // set selected week
    case WEEK_SET_SELECTED: {
      return {
        ...state,
        selectedWeek: action.payload,
      };
    }
    default:
      return state;
  }
};

export default weekListReducer;
