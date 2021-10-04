import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_SET_CURRENT_PLAN_REQUEST,
  USER_SET_CURRENT_PLAN_SUCCESS,
  USER_SET_CURRENT_PLAN_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
} from '../constants/userConstants';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload.result,
      };
    case USER_SIGNIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload.result };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_SET_CURRENT_PLAN_REQUEST:
      return { ...state, loading: true };
    case USER_SET_CURRENT_PLAN_SUCCESS:
      console.log(action.payload.user);
      return { ...state, loading: false, currentUser: action.payload.user };
    case USER_SET_CURRENT_PLAN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_GET_REQUEST:
      return { ...state, loading: true };
    case USER_GET_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload.user };
    case USER_GET_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
