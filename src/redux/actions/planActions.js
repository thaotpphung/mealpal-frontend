import {
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
  PLAN_LIST_FAIL,
  PLAN_DETAILS_REQUEST,
  PLAN_DETAILS_SUCCESS,
  PLAN_DETAILS_FAIL,
  PLAN_CREATE_REQUEST,
  PLAN_CREATE_SUCCESS,
  PLAN_CREATE_FAIL,
  PLAN_DELETE_SUCCESS,
  PLAN_DELETE_FAIL,
  PLAN_DELETE_REQUEST,
  PLAN_UPDATE_REQUEST,
  PLAN_UPDATE_FAIL,
  PLAN_UPDATE_SUCCESS,
} from "../constants/planConstants";
import * as api from '../../api/index';


const createPlan = (plan) => async (dispatch) => {
  try {
    console.log("plan action", plan)
    dispatch({ type: PLAN_CREATE_REQUEST, payload: plan });
    const { data } = await api.createPlan(plan);
    console.log('data received', data);
    dispatch({ type: PLAN_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLAN_CREATE_FAIL, payload: error.response.data.message });
  }
};


const getPlanList = () => async (dispatch) => {
  try {
    dispatch({ type: PLAN_LIST_REQUEST });
    const { data } = await api.getPlanList();
    dispatch({ type: PLAN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLAN_LIST_FAIL, payload: error.response.data.message });
  }
};

const getPlanDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLAN_DETAILS_REQUEST, payload: id });
    const { data } = await api.getPlanDetails(id)
    dispatch({ type: PLAN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLAN_DETAILS_FAIL, payload: error.response.data.message });
  }
};



const deletePlan = (id ) => async (dispatch) => {
  try {
    dispatch({ type: PLAN_DELETE_REQUEST, payload: id });
    await api.deletePlan(id);
    dispatch({ type: PLAN_DELETE_SUCCESS, payload: id, success: true });
  } catch (error) {
    dispatch({ type: PLAN_DELETE_FAIL, payload: error.response.data.message });
  }
};

const updatePlan = (id, plan) => async (dispatch) => {
  try {
    dispatch({ type: PLAN_UPDATE_REQUEST, payload: id });
    const { data } = await api.updatePlan(id, plan)
    dispatch({ type: PLAN_UPDATE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PLAN_UPDATE_FAIL, payload: error.response.data.message });
  }
};

export {
  getPlanList,
  getPlanDetails,
  createPlan,
  deletePlan,
  updatePlan,
};
