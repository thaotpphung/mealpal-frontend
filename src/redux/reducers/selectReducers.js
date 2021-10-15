import { SET_SELECTED_WEEK } from '../constants/selectConstants';

const INITIAL_STATE = {
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
          id: action.payload?._id,
          name: action.payload?.weekName,
        },
      };

    default:
      return state;
  }
};

export default planListReducer;
