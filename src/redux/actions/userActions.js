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
import * as api from '../../api/index';

export { signin, register, logout, setCurrentPlan, getUser };

const signin = (formData) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: formData });
  try {
    const { data } = await api.signin(formData);
    console.log('user sign in data received ', data);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('currentUser', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.message });
  }
};

const register = (formData) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: formData });
  try {
    const { data } = await api.register(formData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('currentUser', JSON.stringify(data));
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

const setCurrentPlan = (planId, weekId) => async (dispatch) => {
  dispatch({ type: USER_SET_CURRENT_PLAN_REQUEST });
  try {
    const { data } = await api.setCurrentPlan(planId, weekId);
    dispatch({ type: USER_SET_CURRENT_PLAN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SET_CURRENT_PLAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

const getUser = () => async (dispatch) => {
  dispatch({ type: USER_GET_REQUEST });
  try {
    const { data } = await api.getUser();
    console.log('data received getuser ', data);
    dispatch({ type: USER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_GET_FAIL, payload: error.response.data.message });
  }
};
