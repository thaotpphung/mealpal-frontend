import {
  PLAN_CREATE_REQUEST,
  PLAN_CREATE_SUCCESS,
  PLAN_CREATE_FAIL,

  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
  PLAN_LIST_FAIL,

  PLAN_SET_SELECTED

} from "../constants/planConstants";
import * as api from '../../api/index';

export {
  createPlan,
  getPlanList,
};


const createPlan = (plan, router) => async (dispatch) => {
  try {
    dispatch({ type: PLAN_CREATE_REQUEST, payload: plan });
    const { data } = await api.createPlan(plan);
    dispatch({ type: PLAN_CREATE_SUCCESS, payload: data });
    router.push(`/plans/${data._id}/weeks/${null}`);
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
}

const setSelectedPlan = (planId) => async (dispatch) => {
  try {
    dispatch({type: PLAN_SET_SELECTED})
  } catch (error) {
    console.log(error);
  }
}



