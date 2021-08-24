import {
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,
  WEEK_CREATE_REQUEST,
  WEEK_CREATE_SUCCESS,
  WEEK_CREATE_FAIL,
} from "../constants/weekConstants";

const INITIAL_STATE = {
  weeks: [],
  loading: false,
  error: null,
};

const mappedWeek = (week) => {
  return {
    content: week.weekName,
    // isSelected: currentPlan === week._id,
    isSelected: false,
    // action: currentPlan === week._id ? <Chip size="small" label="Default" icon={<StarIcon />} /> : null
    action: null,
  }
}

export const weekListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WEEK_CREATE_REQUEST:
      return { ...state, loading: true };
    case WEEK_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        weeks: [...state.weeks, mappedWeek(action.payload)],
      };
    case WEEK_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case WEEK_LIST_REQUEST:
      return { ...state, loading: true };
    case WEEK_LIST_SUCCESS:
      console.log('weeks in list success', action.payload)
      const mappedWeeks = action.payload.map((week) => (mappedWeek(week)));
      return { ...state, loading : false, weeks: mappedWeeks };
    case WEEK_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
