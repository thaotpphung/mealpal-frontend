import {
  WEEK_CREATE_REQUEST,
  WEEK_CREATE_SUCCESS,
  WEEK_CREATE_FAIL,

  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,

} from "../constants/weekConstants";
import * as api from '../../api/index';

export {
  createWeek,
  getWeekListByPlanId,
};

const createWeek = (week, router) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_CREATE_REQUEST, payload: week });
    const { data } = await api.createWeek(week);
    dispatch({ type: WEEK_CREATE_SUCCESS, payload: data });
    // router.push(`/plans/${data.planId}/weeks/${data._id}`);
  } catch (error) {
    dispatch({ type: WEEK_CREATE_FAIL, payload: error.response.data.message });
  }
};

const getWeekListByPlanId = (planId) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_LIST_REQUEST });
    const { data } = await api.getWeekListByPlanId(planId);
    dispatch({ type: WEEK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WEEK_LIST_FAIL, payload: error.response.data.message });
  }
}



