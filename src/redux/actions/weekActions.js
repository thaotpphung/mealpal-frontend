import {
  WEEK_CREATE_REQUEST,
  WEEK_CREATE_SUCCESS,
  WEEK_CREATE_FAIL,
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,
  WEEK_DELETE_REQUEST,
  WEEK_DELETE_SUCCESS,
  WEEK_DELETE_FAIL,
  WEEK_UPDATE_REQUEST,
  WEEK_UPDATE_SUCCESS,
  WEEK_UPDATE_FAIL,
  WEEK_DETAILS_REQUEST,
  WEEK_DETAILS_SUCCESS,
  WEEK_DETAILS_FAIL,
  WEEK_UPDATE_BY_DAY_REQUEST,
  WEEK_UPDATE_BY_DAY_SUCCESS,
  WEEK_UPDATE_BY_DAY_FAIL,
} from '../constants/weekConstants';
import { SET_SELECTED_WEEK } from '../constants/selectConstants';

import * as api from '../../api/index';

export {
  createWeek,
  getAllWeeks,
  deleteWeek,
  updateWeek,
  getWeek,
  updateWeekByDay,
};

const createWeek = (week) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_CREATE_REQUEST, payload: week });
    const { data } = await api.createWeek(week);
    dispatch({ type: WEEK_CREATE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: WEEK_CREATE_FAIL, payload: error.response.data.message });
  }
};

const getAllWeeks =
  (query = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: WEEK_LIST_REQUEST });
      const { data } = await api.getWeeks(query);
      dispatch({ type: WEEK_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: WEEK_LIST_FAIL, payload: error.response.data.message });
    }
  };

const getWeek = (id) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_DETAILS_REQUEST });
    const { data } = await api.getWeek(id);
    dispatch({ type: WEEK_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: WEEK_DETAILS_FAIL, payload: error.response.data.message });
  }
};

const deleteWeek = (weekId, currentWeek) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_DELETE_REQUEST });
    await api.deleteWeek(weekId);
    dispatch({ type: WEEK_DELETE_SUCCESS, payload: weekId });
    dispatch({ type: SET_SELECTED_WEEK, payload: currentWeek });
  } catch (error) {
    dispatch({ type: WEEK_DELETE_FAIL, payload: error.response.data.message });
  }
};

const updateWeek = (weekId, week) => async (dispatch) => {
  try {
    console.log('update', week);
    dispatch({ type: WEEK_UPDATE_REQUEST });
    const { data } = await api.updateWeek(weekId, week);
    dispatch({ type: WEEK_UPDATE_SUCCESS, payload: week });
  } catch (error) {
    dispatch({
      type: WEEK_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const updateWeekByDay = (weekId, dayIdx, day) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_UPDATE_BY_DAY_REQUEST });
    await api.updateWeekByDay(weekId, dayIdx, day);
    dispatch({ type: WEEK_UPDATE_BY_DAY_SUCCESS, payload: { dayIdx, day } });
  } catch (error) {
    dispatch({
      type: WEEK_UPDATE_BY_DAY_FAIL,
      payload: error.response.data.message,
    });
  }
};
