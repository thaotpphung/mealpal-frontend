import {
  SET_SELECTED_PLAN,
  SET_SELECTED_WEEK,
  SET_INITIAL_SELECT,
} from '../constants/selectConstants';

const INITIAL_STATE = {
  selectedPlan: null,
  selectedWeek: null,
};

const planListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // set selected plan
    case SET_SELECTED_WEEK:
      return {
        ...state,
        selectedWeek: action.payload,
      };
    case SET_SELECTED_PLAN:
      return {
        selectedPlan: action.payload,
        selectedWeek: 'Please select a week in this plan',
      };
    case SET_INITIAL_SELECT:
      return {
        selectedPlan: action.payload.planId,
        selectedWeek: action.payload.weekId,
      };

    default:
      return state;
  }
};

export default planListReducer;
