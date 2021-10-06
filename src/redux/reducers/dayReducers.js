import {
  DAY_LIST_REQUEST,
  DAY_LIST_SUCCESS,
  DAY_LIST_FAIL,
  DAY_UPDATE_REQUEST,
  DAY_UPDATE_SUCCESS,
  DAY_UPDATE_FAIL,
} from '../constants/dayConstants';
import _ from 'lodash';

const INITIAL_STATE = {
  days: {},
  loading: false,
  error: null,
};

const dayListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DAY_LIST_REQUEST:
      return { ...state, loading: true };
    case DAY_LIST_SUCCESS: {
      const days = _.mapKeys(action.payload, '_id');
      return { ...state, loading: false, days: days };
    }
    case DAY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DAY_UPDATE_REQUEST:
      return { ...state, loading: true };
    case DAY_UPDATE_SUCCESS: {
      return { ...state, loading: false };
    }
    case DAY_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default dayListReducer;
