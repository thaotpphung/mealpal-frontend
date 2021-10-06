import {
  DAY_LIST_REQUEST,
  DAY_LIST_SUCCESS,
  DAY_LIST_FAIL,
  DAY_UPDATE_REQUEST,
  DAY_UPDATE_SUCCESS,
  DAY_UPDATE_FAIL,
} from '../constants/dayConstants';
import * as api from '../../api/index';

export { getDayListByWeekId, updateDay };

const updateDay = (dayId, meals) => async (dispatch) => {
  try {
    dispatch({ type: DAY_UPDATE_REQUEST });
    console.log('meals', meals, 'dayid', dayId);
    const { data } = await api.updateDay(dayId, meals);
    dispatch({ type: DAY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DAY_UPDATE_FAIL, payload: error.response.data.message });
  }
};

const getDayListByWeekId = (weekId) => async (dispatch) => {
  try {
    dispatch({ type: DAY_LIST_REQUEST });
    const { data } = await api.getDayListByWeekId(weekId);
    dispatch({ type: DAY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DAY_LIST_FAIL, payload: error.response.data.message });
  }
};
