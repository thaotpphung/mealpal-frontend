import {
  WEEK_CREATE_REQUEST,
  WEEK_CREATE_SUCCESS,
  WEEK_CREATE_FAIL,
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,
  WEEK_SET_SELECTED,
} from '../constants/weekConstants';
import * as api from '../../api/index';

export { createWeek, getWeekListByPlanId, setSelectedWeek };

const createWeek = (week) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_CREATE_REQUEST, payload: week });
    const { data } = await api.createWeek(week);
    dispatch({ type: WEEK_CREATE_SUCCESS, payload: data });
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
};

const setSelectedWeek = (weekId) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_SET_SELECTED, payload: weekId });
  } catch (error) {
    console.log(error);
  }
};
