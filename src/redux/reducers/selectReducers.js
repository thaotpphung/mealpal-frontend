import {
  SET_SELECTED_PLAN,
  SET_SELECTED_WEEK,
  SET_INITIAL_SELECT,
} from '../constants/selectConstants';

const INITIAL_STATE = {
  selectedPlan: {
    id: null,
    name: null,
  },
  selectedWeek: {
    id: null,
    name: null,
  },
};

const planListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_WEEK:
      return {
        ...state,
        selectedWeek: {
          id: action.payload._id,
          name: action.payload.weekName,
        },
      };
    case SET_SELECTED_PLAN:
      return {
        selectedPlan: {
          id: action.payload._id,
          name: action.payload.planName,
        },
        selectedWeek: {
          id: null,
          name: 'Please select a week in this plan',
        },
      };
    case SET_INITIAL_SELECT:
      return {
        selectedPlan: {
          id: action.payload.currentPlan._id,
          name: action.payload.currentPlan.planName,
        },
        selectedWeek: {
          id: action.payload.currentWeek._id,
          name: action.payload.currentWeek.weekName,
        },
      };

    default:
      return state;
  }
};

export default planListReducer;
