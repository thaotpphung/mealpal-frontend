import {
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,
  WEEK_LIST_DELETE_REQUEST,
  WEEK_LIST_DELETE_SUCCESS,
  WEEK_LIST_DELETE_FAIL,
  WEEK_LIST_APPEND_REQUEST,
  WEEK_LIST_APPEND_SUCCESS,
  WEEK_LIST_APPEND_FAIL,
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
import cloneDeep from 'lodash/cloneDeep';

const INITIAL_STATE = {
  weeks: [],
  loading: false,
  loadingMore: false,
  count: 0,
  currentCount: 0,
  error: '',
};

function weekListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case WEEK_LIST_REQUEST:
    case WEEK_LIST_DELETE_REQUEST:
      return { ...state, loading: true, error: '' };

    case WEEK_LIST_APPEND_REQUEST:
      return { ...state, loadingMore: true, error: '' };

    case WEEK_LIST_DELETE_SUCCESS:
    case WEEK_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        weeks: action.payload.data,
        count: action.payload.count,
        currentCount: action.payload.currentCount,
        error: '',
      };
    }

    case WEEK_LIST_APPEND_SUCCESS: {
      let updatedWeeks = cloneDeep(state.weeks);
      action.payload.data.forEach((item) => {
        updatedWeeks.push(item);
      });
      return {
        ...state,
        loadingMore: false,
        weeks: updatedWeeks,
        count: action.payload.count,
        currentCount: action.payload.currentCount,
        error: '',
      };
    }

    case WEEK_LIST_FAIL:
    case WEEK_LIST_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case WEEK_LIST_APPEND_FAIL:
      return { ...state, loadingMore: false, error: action.payload };

    default:
      return state;
  }
}

function weekDetailsReducer(
  state = { week: { days: [] }, loading: false, error: '' },
  action
) {
  switch (action.type) {
    case WEEK_CREATE_REQUEST:
    case WEEK_DETAILS_REQUEST:
    case WEEK_DELETE_REQUEST:
      return { ...state, loading: true, error: '' };

    case WEEK_UPDATE_REQUEST:
    case WEEK_UPDATE_BY_DAY_REQUEST:
      return { ...state, loadingUpdate: true, error: '' };

    case WEEK_CREATE_SUCCESS:
    case WEEK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        week: { ...state.week, ...action.payload },
        error: '',
      };

    case WEEK_UPDATE_SUCCESS: {
      return {
        ...state,
        loadingUpdate: false,
        week: { ...state.week, ...action.payload },
        error: '',
      };
    }

    case WEEK_UPDATE_BY_DAY_SUCCESS: {
      const { dayIdx, day } = action.payload;
      let updatedWeek = cloneDeep(state.week);
      updatedWeek.days[dayIdx] = day;
      return {
        ...state,
        loadingUpdate: false,
        week: updatedWeek,
        error: '',
      };
    }

    case WEEK_DELETE_SUCCESS:
      return { ...state, loading: false, error: '' };

    case WEEK_CREATE_FAIL:
    case WEEK_DETAILS_FAIL:
    case WEEK_UPDATE_BY_DAY_FAIL:
    case WEEK_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case WEEK_UPDATE_FAIL:
      return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
}

export { weekListReducer, weekDetailsReducer };
