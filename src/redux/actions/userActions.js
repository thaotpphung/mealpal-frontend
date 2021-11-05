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
import { addAlertWithTimeout } from '../actions/alertActions';
import * as api from '../../api/index';
export { signin, register, logout, updateUser, updatePassword };

const signin = (formData) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: formData });
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('loggedInUser', JSON.stringify(data.data));
    dispatch(addAlertWithTimeout('success', 'Welcome back!'));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL });
    dispatch(addAlertWithTimeout('error', error.response.data.message));
  }
};

const register = (formData) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: formData });
  try {
    const { data } = await api.register(formData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('loggedInUser', JSON.stringify(data.data));
    dispatch(addAlertWithTimeout('success', 'Welcome to MealPal!'));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL });
    dispatch(addAlertWithTimeout('error', error.response.data.message));
  }
};

const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT, payload: {} });
  dispatch(addAlertWithTimeout('success', 'Successfully logged out!'));
};

const updateUser = (userId, formData) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  try {
    const { data } = await api.updateUser(userId, formData);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch(addAlertWithTimeout('success', 'Successfully updated user!'));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL });
    dispatch(addAlertWithTimeout('error', error.response.data.message));
  }
};

const updatePassword = (userId, formData) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });
  try {
    const { data } = await api.updatePassword(userId, formData);
    dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: USER_UPDATE_PASSWORD_FAIL });
    dispatch(addAlertWithTimeout('error', error.response.data.message));
  }
};
