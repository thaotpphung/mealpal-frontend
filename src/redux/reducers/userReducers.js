import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT } from '../constants/userConstants';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
  currentPlan: '',
  currentWeek: ''
}

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, currentUser: action.payload, currentPlan: action.payload.result.currentPlan};
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return { currentUser: null, success: action.payload};

    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, currentUser: action.payload };
    case USER_REGISTER_FAIL:
      return {loading: false, error: action.payload };
      
    default: return state;
  }
}