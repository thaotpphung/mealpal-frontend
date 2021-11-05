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

const INITIAL_STATE = {
  weeks: {},
  loading: false,
  count: 0,
  currentCount: 0,
};

function weekListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case WEEK_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    case WEEK_LIST_SUCCESS: {
      return {
        loading: false,
        weeks: action.payload.data,
        count: action.payload.count,
        currentCount: action.payload.currentCount,
      };
    }
    case WEEK_LIST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}

function weekDetailsReducer(
  state = { week: { days: [] }, loading: false },
  action
) {
  switch (action.type) {
    case WEEK_CREATE_REQUEST:
    case WEEK_DETAILS_REQUEST:
    case WEEK_UPDATE_REQUEST:
    case WEEK_UPDATE_BY_DAY_REQUEST:
    case WEEK_DELETE_REQUEST:
      return { ...state, loading: true };

    case WEEK_CREATE_SUCCESS:
    case WEEK_DETAILS_SUCCESS:
      return {
        loading: false,
        week: action.payload,
      };

    case WEEK_UPDATE_SUCCESS: {
      return {
        loading: false,
        week: { ...state.week, ...action.payload },
      };
    }

    case WEEK_UPDATE_BY_DAY_SUCCESS: {
      const { dayIdx, day } = action.payload;
      let updatedWeek = _.cloneDeep(state.week);
      updatedWeek.days[dayIdx] = day;
      return {
        loading: false,
        week: updatedWeek,
      };
    }

    case WEEK_CREATE_FAIL:
    case WEEK_DETAILS_FAIL:
    case WEEK_UPDATE_FAIL:
    case WEEK_UPDATE_BY_DAY_FAIL:
    case WEEK_DELETE_FAIL:
    case WEEK_DELETE_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export { weekListReducer, weekDetailsReducer };
