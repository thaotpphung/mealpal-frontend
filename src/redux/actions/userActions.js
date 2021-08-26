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
} from "../constants/userConstants";
import * as api from '../../api/index';

export { signin, register, logout, setCurrentPlan };

const signin = (formData, router) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: formData});
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('currentUser', JSON.stringify(data));
    localStorage.setItem('currentPlan', data.result.currentPlan);
    localStorage.setItem('currentWeek', data.result.currentWeek);
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.message });
  }
}

const register = (formData, router) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: formData });
  try {
    const { data } = await api.register(formData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('currentUser', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message });
  }
}

const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT, payload: "Successfully logged out!" })
}

const setCurrentPlan = (planId, weekId) => async (dispatch) => {
  dispatch({ type: USER_SET_CURRENT_PLAN_REQUEST, payload: {planId, weekId} });
  try {
    const { data } = await api.setCurrentPlan(planId, weekId);
    dispatch({ type: USER_SET_CURRENT_PLAN_SUCCESS, payload: {planId, weekId} });
    localStorage.setItem('currentPlan', planId);
    localStorage.setItem('currentWeek', weekId);
  } catch (error) {
    dispatch({ type: USER_SET_CURRENT_PLAN_FAIL, payload: error.response.data.message });
  }
}

