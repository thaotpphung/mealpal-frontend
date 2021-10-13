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
} from '../constants/weekConstants';
import { SET_SELECTED_WEEK } from '../constants/selectConstants';

import * as api from '../../api/index';

export { createWeek, getAllWeeks, deleteWeek };

const createWeek = (week) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_CREATE_REQUEST, payload: week });
    const { data } = await api.createWeek(week);
    dispatch({ type: WEEK_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WEEK_CREATE_FAIL, payload: error.response.data.message });
  }
};

const getAllWeeks = () => async (dispatch) => {
  try {
    dispatch({ type: WEEK_LIST_REQUEST });
    const { data } = await api.getWeeks();
    dispatch({ type: WEEK_LIST_SUCCESS, payload: data });
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
