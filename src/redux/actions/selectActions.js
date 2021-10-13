import { SET_SELECTED_WEEK } from '../constants/selectConstants';

export { setSelectedWeek };

const setSelectedWeek = (week) => async (dispatch) => {
  try {
    dispatch({
      type: SET_SELECTED_WEEK,
      payload: week,
    });
  } catch (error) {
    console.log(error);
  }
};
