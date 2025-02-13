import {
  WEEK_CREATE_REQUEST,
  WEEK_CREATE_SUCCESS,
  WEEK_CREATE_FAIL,
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,
  WEEK_LIST_DELETE_REQUEST,
  WEEK_LIST_DELETE_SUCCESS,
  WEEK_LIST_DELETE_FAIL,
  WEEK_LIST_APPEND_REQUEST,
  WEEK_LIST_APPEND_SUCCESS,
  WEEK_LIST_APPEND_FAIL,
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
import { addAlertWithTimeout } from './alertActions';
import * as api from '../../api/index';
import { errorMessage } from '../../constants/messages';

export {
  createWeek,
  getAllWeeks,
  deleteWeek,
  updateWeek,
  getWeek,
  updateWeekByDay,
  getAllWeeksInfinite,
  deleteWeeks,
};

// week list
const getAllWeeks =
  (query = {}, isInExploreMode, userId) =>
  async (dispatch) => {
    try {
      dispatch({ type: WEEK_LIST_REQUEST, payload: query });
      const { data } = await api.getWeeks(query, isInExploreMode, userId);
      dispatch({ type: WEEK_LIST_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: WEEK_LIST_FAIL, payload: error });
      dispatch(
        addAlertWithTimeout(
          'error',
          error.response ? error.response.data.message : errorMessage
        )
      );
    }
  };

// week list infinite
const getAllWeeksInfinite =
  (query = {}, isInExploreMode, userId) =>
  async (dispatch) => {
    try {
      dispatch({ type: WEEK_LIST_APPEND_REQUEST, payload: query });
      const { data } = await api.getWeeks(query, isInExploreMode, userId);
      dispatch({ type: WEEK_LIST_APPEND_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: WEEK_LIST_APPEND_FAIL, payload: error });
      dispatch(
        addAlertWithTimeout(
          'error',
          error.response ? error.response.data.message : errorMessage
        )
      );
    }
  };

// week details
const createWeek =
  (week, router, recipes = []) =>
  async (dispatch) => {
    try {
      dispatch({ type: WEEK_CREATE_REQUEST, payload: { week, recipes } });
      const { data } = await api.createWeek(week);
      dispatch({ type: WEEK_CREATE_SUCCESS, payload: data.data });
      router.push({
        pathname: `/users/${week.userId}/weeks/${data.data._id}`,
        isRedirect: true,
        data: data.data,
        recipes: recipes,
      });
      dispatch(addAlertWithTimeout('success', data.message));
    } catch (error) {
      dispatch({
        type: WEEK_CREATE_FAIL,
        payload: error,
      });
      dispatch(
        addAlertWithTimeout(
          'error',
          error.response ? error.response.data.message : errorMessage
        )
      );
    }
  };

const getWeek = (weekId) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_DETAILS_REQUEST });
    const { data } = await api.getWeek(weekId);
    dispatch({ type: WEEK_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: WEEK_DETAILS_FAIL,
      payload: error,
    });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const deleteWeek = (weekId, user, router) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_DELETE_REQUEST, payload: { weekId, user } });
    const { data } = await api.deleteWeek(weekId);
    dispatch({ type: WEEK_DELETE_SUCCESS, payload: weekId });
    router.push(`/users/${user._id}/weeks`);
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: WEEK_DELETE_FAIL, payload: error });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const deleteWeeks = (selected, user, query) => async (dispatch) => {
  try {
    dispatch({
      type: WEEK_LIST_DELETE_REQUEST,
      payload: { selected, user, query },
    });
    const { data } = await api.deleteWeeks(selected, query);
    dispatch({ type: WEEK_LIST_DELETE_SUCCESS, payload: data.data });
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: WEEK_LIST_DELETE_FAIL, payload: error });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const updateWeek = (weekId, week) => async (dispatch) => {
  try {
    dispatch({ type: WEEK_UPDATE_REQUEST, payload: { weekId, week } });
    const { data } = await api.updateWeek(weekId, week);
    dispatch({ type: WEEK_UPDATE_SUCCESS, payload: week });
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({ type: WEEK_UPDATE_FAIL, payload: error });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};

const updateWeekByDay = (weekId, dayIdx, day) => async (dispatch) => {
  try {
    dispatch({
      type: WEEK_UPDATE_BY_DAY_REQUEST,
      payload: { weekId, dayIdx, day },
    });
    const { data } = await api.updateWeekByDay(weekId, dayIdx, day);
    dispatch({ type: WEEK_UPDATE_BY_DAY_SUCCESS, payload: { dayIdx, day } });
    dispatch(addAlertWithTimeout('success', data.message));
  } catch (error) {
    dispatch({
      type: WEEK_UPDATE_BY_DAY_FAIL,
      payload: error,
    });
    dispatch(
      addAlertWithTimeout(
        'error',
        error.response ? error.response.data.message : errorMessage
      )
    );
  }
};
