import {
  PLAN_CREATE_REQUEST,
  PLAN_CREATE_SUCCESS,
  PLAN_CREATE_FAIL,
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
  PLAN_LIST_FAIL,
  PLAN_DELETE_REQUEST,
  PLAN_DELETE_SUCCESS,
  PLAN_DELETE_FAIL,
} from '../constants/planConstants';
import * as api from '../../api/index';

export { createPlan, getPlanList, deletePlan };

const createPlan = (plan, router) => async (dispatch) => {
  try {
    dispatch({ type: PLAN_CREATE_REQUEST, payload: plan });
    const { data } = await api.createPlan(plan);
    dispatch({ type: PLAN_CREATE_SUCCESS, payload: { data } });
    router.push(`/plans`);
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

const deletePlan = (planId) => async (dispatch) => {
  try {
    dispatch({ type: PLAN_DELETE_REQUEST });
    await api.deletePlan(planId);
    dispatch({ type: PLAN_DELETE_SUCCESS, payload: planId });
  } catch (error) {
    dispatch({ type: PLAN_DELETE_FAIL, payload: error.response.data.message });
  }
};
