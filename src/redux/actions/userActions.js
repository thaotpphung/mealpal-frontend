import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_SET_CURRENT_WEEK_REQUEST,
  USER_SET_CURRENT_WEEK_SUCCESS,
  USER_SET_CURRENT_WEEK_FAIL,
} from '../constants/userConstants';
import * as api from '../../api/index';

export { signin, register, logout, setCurrentWeek };

const signin = (formData) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: formData });
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data });
    localStorage.setItem('currentUser', JSON.stringify(data.data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.message });
  }
};

const register = (formData) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: formData });
  try {
    const { data } = await api.register(formData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.data });
    localStorage.setItem('currentUser', JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT, payload: 'Successfully logged out!' });
};

const setCurrentWeek = (weekId) => async (dispatch) => {
  dispatch({ type: USER_SET_CURRENT_WEEK_REQUEST });
  try {
    const { data } = await api.setCurrentWeek(weekId);
    dispatch({ type: USER_SET_CURRENT_WEEK_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: USER_SET_CURRENT_WEEK_FAIL,
      payload: error.response.data.message,
    });
  }
};
