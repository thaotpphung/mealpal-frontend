import {
  // DAY_UPDATE_REQUEST,
  // DAY_UPDATE_SUCCESS,
  // DAY_UPDATE_FAIL,
  DAY_LIST_REQUEST,
  DAY_LIST_SUCCESS,
  DAY_LIST_FAIL,
} from '../constants/dayConstants';
import * as api from '../../api/index';

export { getDayListByWeekId };

// const updateDay = (dayId, day) => async (dispatch) => {
//   try {
//     dispatch({ type: DAY_UPDATE_REQUEST });
//     // const { data } = await api.updateDay(dayId, day);
//     dispatch({ type: DAY_UPDATE_SUCCESS, payload: 'test' });
//   } catch (error) {
//     dispatch({ type: DAY_UPDATE_FAIL, payload: error.response.data.message });
//   }
// };

const getDayListByWeekId = (weekId) => async (dispatch) => {
  try {
    dispatch({ type: DAY_LIST_REQUEST });
    const { data } = await api.getDayListByWeekId(weekId);
    dispatch({ type: DAY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DAY_LIST_FAIL, payload: error.response.data.message });
  }
};
