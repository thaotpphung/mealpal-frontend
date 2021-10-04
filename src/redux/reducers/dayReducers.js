import {
  DAY_LIST_REQUEST,
  DAY_LIST_SUCCESS,
  DAY_LIST_FAIL,
} from '../constants/dayConstants';

const INITIAL_STATE = {
  days: [],
  loading: false,
  error: null,
};

const dayListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DAY_LIST_REQUEST:
      return { ...state, loading: true };
    case DAY_LIST_SUCCESS:
      return { ...state, loading: false, days: action.payload };
    case DAY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default dayListReducer;
