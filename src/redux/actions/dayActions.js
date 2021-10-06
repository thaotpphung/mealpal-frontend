import {
  DAY_LIST_REQUEST,
  DAY_LIST_SUCCESS,
  DAY_LIST_FAIL,
} from '../constants/dayConstants';
import * as api from '../../api/index';

export { getDayListByWeekId };

const getDayListByWeekId = (weekId) => async (dispatch) => {
  try {
    dispatch({ type: DAY_LIST_REQUEST });
    const { data } = await api.getDayListByWeekId(weekId);
    dispatch({ type: DAY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DAY_LIST_FAIL, payload: error.response.data.message });
  }
};
