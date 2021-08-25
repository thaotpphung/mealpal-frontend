import { 
PLAN_LIST_REQUEST,
PLAN_LIST_SUCCESS,
PLAN_LIST_FAIL,
  
PLAN_CREATE_REQUEST,
PLAN_CREATE_SUCCESS,
PLAN_CREATE_FAIL,

PLAN_SET_SELECTED

} from '../constants/planConstants';
import Chip from "@material-ui/core/Chip";
import StarIcon from "@material-ui/icons/Star";


const INITIAL_STATE = {
  plans: [],
  loading: false,
  error: null,
  selectedPlan: localStorage.getItem('currentPlan')
}

const mappedPlan = (plan, selectedPlan ) => {
  return {
    content: plan.planName,
    isSelected: selectedPlan === plan._id,
    action: selectedPlan === plan._id ? <Chip size="small" label="Current" icon={<StarIcon />} /> : null,
    _id: plan._id
  }
}

export const planListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case PLAN_CREATE_REQUEST:
      return { ...state, loading: true };
    case PLAN_CREATE_SUCCESS:
      return { ...state, loading: false, plans: [...state.plans, action.payload]};
    case PLAN_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload};

    case PLAN_LIST_REQUEST:
      return { ...state, loading: true };
    case PLAN_LIST_SUCCESS:
      const mappedPlans = action.payload.map(plan => (mappedPlan(plan, INITIAL_STATE.selectedPlan)));
      return { ...state, loading: false, plans: mappedPlans, success: true };
    case PLAN_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PLAN_SET_SELECTED:
      const mappedPlansSelected = state.plans.map((plan) => ({...plan, isSelected: action.payload === plan._id}));
      return { ...state, selectedPlan: action.payload, plans: mappedPlansSelected }


    default: return state;
  }
}
