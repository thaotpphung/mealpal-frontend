import { SET_SELECTED_WEEK } from '../constants/selectConstants';

export { setSelectedWeek };

const setSelectedWeek = (week) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_WEEK,
    payload: week,
  });
};
