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
} from '../constants/weekConstants';
import { SET_SELECTED_WEEK } from '../constants/selectConstants';

import * as api from '../../api/index';

export { createWeek, getAllWeeks, deleteWeek, updateWeek };

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

const deleteWeek = (weekId) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_DELETE_REQUEST });
    await api.deleteWeek(weekId);
    dispatch({ type: WEEK_DELETE_SUCCESS, payload: weekId });
    dispatch({ type: SET_SELECTED_WEEK, payload: null });
  } catch (error) {
    dispatch({ type: WEEK_DELETE_FAIL, payload: error.response.data.message });
  }
};

const updateWeek = (weekId, week) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_UPDATE_REQUEST });
    const { data } = await api.updateWeek(weekId, week);
    dispatch({ type: WEEK_UPDATE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: WEEK_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
