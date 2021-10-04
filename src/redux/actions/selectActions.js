import {
  SET_SELECTED_PLAN,
  SET_SELECTED_WEEK,
  SET_INITIAL_SELECT,
} from '../constants/selectConstants';

export { setSelectedPlan, setSelectedWeek, setInitialSelect };

const setSelectedPlan = (planId) => async (dispatch) => {
  try {
    dispatch({
      type: SET_SELECTED_PLAN,
      payload: planId,
    });
  } catch (error) {
    console.log(error);
  }
};

const setSelectedWeek = (weekId) => async (dispatch) => {
  try {
    dispatch({
      type: SET_SELECTED_WEEK,
      payload: weekId,
    });
  } catch (error) {
    console.log(error);
  }
};

const setInitialSelect = (planId, weekId) => async (dispatch) => {
  try {
    dispatch({
      type: SET_INITIAL_SELECT,
      payload: { planId, weekId },
    });
  } catch (error) {
    console.log(error);
  }
};
