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
import { addAlertWithTimeout } from '../actions/alertActions';
import * as api from '../../api/index';

export {
  createWeek,
  getAllWeeks,
  deleteWeek,
  updateWeek,
  getWeek,
  updateWeekByDay,
};

// week list
const getAllWeeks =
  (query = '', isInExploreMode, userId) =>
  async (dispatch) => {
    try {
      dispatch({ type: WEEK_LIST_REQUEST });
      const { data } = await api.getWeeks(query, isInExploreMode, userId);
      dispatch({ type: WEEK_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: WEEK_LIST_FAIL });
      dispatch(addAlertWithTimeout('error', error.response.data.message));
    }
  };

// week details
const createWeek = (week, router) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_CREATE_REQUEST, payload: week });
    const { data } = await api.createWeek(week);
    dispatch({ type: WEEK_CREATE_SUCCESS, payload: data.data });
    router.push({
      pathname: `/weeks/${data.data._id}`,
      isRedirect: true,
      data: data.data,
    });
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: WEEK_CREATE_FAIL });
    dispatch(addAlertWithTimeout('error', error.response.data.message));
  }
};

const getWeek = (weekId) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_DETAILS_REQUEST });
    const { data } = await api.getWeek(weekId);
    dispatch({ type: WEEK_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: WEEK_DETAILS_FAIL });
    dispatch(addAlertWithTimeout('error', error.response.data.message));
  }
};

const deleteWeek = (weekId, currentWeek, router) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_DELETE_REQUEST });
    const { data } = await api.deleteWeek(weekId);
    dispatch({ type: WEEK_DELETE_SUCCESS, payload: weekId });
    router.push('/weeks');
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: WEEK_DELETE_FAIL });
    dispatch(addAlertWithTimeout('error', error.response.data.message));
  }
};

const updateWeek = (weekId, week) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_UPDATE_REQUEST });
    const { data } = await api.updateWeek(weekId, week);
    dispatch({ type: WEEK_UPDATE_SUCCESS, payload: week });
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: WEEK_UPDATE_FAIL });
    dispatch(addAlertWithTimeout('error', error.response.data.message));
  }
};

const updateWeekByDay = (weekId, dayIdx, day) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_UPDATE_BY_DAY_REQUEST });
    const { data } = await api.updateWeekByDay(weekId, dayIdx, day);
    dispatch({ type: WEEK_UPDATE_BY_DAY_SUCCESS, payload: { dayIdx, day } });
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: WEEK_UPDATE_BY_DAY_FAIL });
    dispatch(addAlertWithTimeout('error', error.response.data.message));
  }
};
