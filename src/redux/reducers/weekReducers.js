import {
  WEEK_LIST_REQUEST,
  WEEK_LIST_SUCCESS,
  WEEK_LIST_FAIL,

  WEEK_CREATE_REQUEST,
  WEEK_CREATE_SUCCESS,
  WEEK_CREATE_FAIL,

  WEEK_SET_SELECTED
} from "../constants/weekConstants";
import Chip from "@material-ui/core/Chip";
import StarIcon from "@material-ui/icons/Star";

const INITIAL_STATE = {
  weeks: [],
  loading: false,
  error: null,
  selectedWeek: localStorage.getItem('currentWeek')
};

const mappedWeek = (week, selectedWeek) => {
  return {
    content: week.weekName,
    isSelected: selectedWeek === week._id,
    action: selectedWeek === week._id ? <Chip size="small" label="Current" icon={<StarIcon />} /> : null,
    _id: week._id
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
      const mappedWeeks = action.payload.map((week) => (mappedWeek(week, INITIAL_STATE.selectedWeek)));
      return { ...state, loading : false, weeks: mappedWeeks };
    case WEEK_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case WEEK_SET_SELECTED:
      const mappedWeeksSelected = state.weeks.map((week) => ({...week, isSelected: action.payload === week._id}));
      return { ...state, selectedWeek: action.payload, weeks: mappedWeeksSelected }

    default:
      return state;
  }
};
