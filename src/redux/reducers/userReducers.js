import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_SET,
} from '../constants/userConstants';

const INITIAL_STATE = {
  loggedInUser: null,
  loading: false,
  error: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SET: {
      return {
        ...state,
        loggedInUser: { ...state.loggedInUser, ...action.payload },
        error: '',
      };
    }
    case USER_LOGOUT:
      return {};

    case USER_SIGNIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: '' };

    case USER_UPDATE_REQUEST:
    case USER_UPDATE_PASSWORD_REQUEST:
      return { ...state, loadingUpdate: true, error: '' };

    case USER_SIGNIN_SUCCESS:
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload.data.result,
        error: '',
      };
    }

    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        loadingUpdate: false,
        loggedInUser: { ...state.loggedInUser, ...action.payload },
        error: '',
      };
    }
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { ...state, loadingUpdate: false, error: action.payload };

    case USER_REGISTER_FAIL:
    case USER_SIGNIN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_UPDATE_FAIL:
    case USER_UPDATE_PASSWORD_FAIL:
      return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
