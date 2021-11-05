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
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../constants/userConstants';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_UPDATE_REQUEST:
    case USER_UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true };

    case USER_SIGNIN_SUCCESS:
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        currentUser: action.payload.data.result,
      };
    }

    case USER_LOGOUT:
      return {};

    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        currentUser: { ...state.currentUser, ...action.payload.data },
      };
    }

    case USER_UPDATE_PASSWORD_SUCCESS:
    case USER_REGISTER_FAIL:
    case USER_SIGNIN_FAIL:
    case USER_UPDATE_FAIL:
    case USER_UPDATE_PASSWORD_FAIL: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
};

export default userReducer;
