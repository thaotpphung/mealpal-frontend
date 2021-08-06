import { PLAN_SELECT } from "../constants/planConstants";

const INITIAL_STATE = {
  selectedPlan: {},
}

function planReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PLAN_SELECT:
      return { selectedPlan: action.payload };
    default: return state;
  }
}

export {
  planReducer
}