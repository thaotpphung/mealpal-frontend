import { 
PLAN_LIST_REQUEST,
PLAN_LIST_SUCCESS,
PLAN_LIST_FAIL,
  
PLAN_CREATE_REQUEST,
PLAN_CREATE_SUCCESS,
PLAN_CREATE_FAIL,

} from '../constants/planConstants';

const INITIAL_STATE = {
  plans: [],
  loading: false,
  error: null,
  selectedPlan: localStorage.getItem('currentPlan')
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
      const mappedPlans = action.payload.map(plan => ({
        content: plan.planName,
        // isSelected: currentPlan === plan._id,
        isSelected: false,
        // action: currentPlan === plan._id ? <Chip size="small" label="Default" icon={<StarIcon />} /> : null
        action: null,
        id: plan._id
      }));
      return { ...state, loading: false, plans: mappedPlans, success: true };
    case PLAN_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };


    default: return state;
  }
}
