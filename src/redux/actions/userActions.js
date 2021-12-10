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
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  USER_SET,
} from '../constants/userConstants';
import { addAlertWithTimeout } from '../actions/alertActions';
import { clearCart } from '../actions/cartActions';
import * as api from '../../api/index';
export {
  signin,
  register,
  logout,
  updateUser,
  updatePassword,
  setUser,
  resetPassword,
};
import { errorMessage } from '../../constants/messages';

const signin = (formData) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: formData });
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        _id: data.data.result._id,
        token: data.data.token,
      })
    );
    dispatch(addAlertWithTimeout('success', 'Welcome back!'));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const register = (formData) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: formData });
  try {
    const { data } = await api.register(formData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        _id: data.data.result._id,
        token: data.data.token,
      })
    );
    dispatch(addAlertWithTimeout('success', 'Welcome to MealPal!'));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};
const updatePassword = (formData) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_PASSWORD_REQUEST, payload: formData });
  try {
    const { data } = await api.updatePassword(formData);
    dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        _id: data.data.result._id,
        token: data.data.token,
      })
    );
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: USER_UPDATE_PASSWORD_FAIL, payload: error });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const resetPassword = (formData, token) => async (dispatch) => {
  dispatch({ type: PASSWORD_RESET_REQUEST, payload: formData });
  try {
    const { data } = await api.resetPassword(formData, token);
    dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data });
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        _id: data.data.result._id,
        token: data.data.token,
      })
    );
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: PASSWORD_RESET_FAIL, payload: error });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
  dispatch(clearCart());
  dispatch(addAlertWithTimeout('success', 'Successfully logged out!'));
};

const updateUser = (userId, formData) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: formData });
  try {
    const { data } = await api.updateUser(userId, formData);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data.data });
    dispatch(addAlertWithTimeout('success', 'Successfully updated user!'));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const setUser = (user) => async (dispatch) => {
  dispatch({ type: USER_SET, payload: user });
};
