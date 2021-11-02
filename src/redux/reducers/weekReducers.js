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
  WEEK_DETAILS_REQUEST,
  WEEK_DETAILS_SUCCESS,
  WEEK_DETAILS_FAIL,
  WEEK_UPDATE_BY_DAY_REQUEST,
  WEEK_UPDATE_BY_DAY_SUCCESS,
  WEEK_UPDATE_BY_DAY_FAIL,
} from '../constants/weekConstants';
import _ from 'lodash';

const INITIAL_STATE = {
  weeks: {},
  loading: false,
  error: null,
};

function weekListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // get all weeks
    case WEEK_LIST_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case WEEK_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        weeks: action.payload.data,
        error: null,
        count: action.payload.count,
        currentCount: action.payload.currentCount,
      };
    }
    case WEEK_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function weekDetailsReducer(
  state = { week: { days: [] }, loading: false, error: null },
  action
) {
  switch (action.type) {
    case WEEK_CREATE_REQUEST:
    case WEEK_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case WEEK_CREATE_SUCCESS:
    case WEEK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        week: action.payload,
      };
    case WEEK_CREATE_FAIL:
    case WEEK_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    // update week info
    case WEEK_UPDATE_REQUEST:
      return { ...state, loading: true, error: null };
    case WEEK_UPDATE_SUCCESS: {
      const updatedWeek = { ...state.week, ...action.payload };
      return {
        loading: false,
        error: null,
        week: updatedWeek,
      };
    }
    case WEEK_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    // update week by day
    case WEEK_UPDATE_BY_DAY_REQUEST:
      return { ...state, loading: true, error: null };
    case WEEK_UPDATE_BY_DAY_SUCCESS: {
      const { dayIdx, day } = action.payload;
      let updatedWeek = _.cloneDeep(state.week);
      updatedWeek.days[dayIdx] = day;
      return {
        loading: false,
        error: null,
        week: updatedWeek,
      };
    }
    case WEEK_UPDATE_BY_DAY_FAIL:
      return { ...state, loading: false, error: action.payload };
    // delete week
    case WEEK_DELETE_REQUEST:
      return { ...state, loading: true, error: null };
    case WEEK_DELETE_SUCCESS: {
      return { ...state, loading: false, error: null };
    }
    case WEEK_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export { weekListReducer, weekDetailsReducer };
