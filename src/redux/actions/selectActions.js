import {
  SET_SELECTED_PLAN,
  SET_SELECTED_WEEK,
  SET_INITIAL_SELECT,
} from '../constants/selectConstants';

export { setSelectedPlan, setSelectedWeek, setInitialSelect };

const setSelectedPlan = (plan) => async (dispatch) => {
  try {
    dispatch({
      type: SET_SELECTED_PLAN,
      payload: plan,
    });
  } catch (error) {
    console.log(error);
  }
};

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

const setInitialSelect = (currentPlan, currentWeek) => async (dispatch) => {
  try {
    dispatch({
      type: SET_INITIAL_SELECT,
      payload: { currentPlan, currentWeek },
    });
  } catch (error) {
    console.log(error);
  }
};
