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
} from '../constants/userConstants';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  status: null,
  message: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_UPDATE_REQUEST:
    case USER_UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true, status: null, message: null };

    case USER_SIGNIN_SUCCESS:
    case USER_REGISTER_SUCCESS: {
      const { status, message, data } = action.payload;
      return {
        ...state,
        loading: false,
        currentUser: data.result,
        status,
        message,
      };
    }

    case USER_LOGOUT:
      return {};

    case USER_UPDATE_SUCCESS: {
      const { status, message, data } = action.payload;
      return {
        ...state,
        loading: false,
        currentUser: { ...state.currentUser, ...data },
        status,
        message,
      };
    }

    case USER_UPDATE_PASSWORD_SUCCESS: {
      const { status, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        status,
        message,
      };
    }

    case USER_REGISTER_FAIL:
    case USER_SIGNIN_FAIL:
    case USER_UPDATE_FAIL:
    case USER_UPDATE_PASSWORD_FAIL: {
      const { status, message } = action.payload;
      return { ...state, loading: false, status, message };
    }

    default:
      return state;
  }
};

export default userReducer;
