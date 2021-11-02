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
import * as api from '../../api/index';

export { signin, register, logout, updateUser, updatePassword };

const signin = (formData) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: formData });
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('currentUser', JSON.stringify(data.data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data });
  }
};

const register = (formData) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: formData });
  try {
    const { data } = await api.register(formData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('currentUser', JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};

const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT, payload: 'Successfully logged out!' });
};

const updateUser = (userId, formData) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  try {
    await api.updateUser(userId, formData);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: formData });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response.data,
    });
  }
};

const updatePassword = (userId, formData) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });
  try {
    const { data } = await api.updatePassword(userId, formData);
    dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};
