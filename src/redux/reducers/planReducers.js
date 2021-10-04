import {
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
  PLAN_LIST_FAIL,
  PLAN_CREATE_REQUEST,
  PLAN_CREATE_SUCCESS,
  PLAN_CREATE_FAIL,
  PLAN_DELETE_REQUEST,
  PLAN_DELETE_SUCCESS,
  PLAN_DELETE_FAIL,
  PLAN_SET_SELECTED,
} from '../constants/planConstants';
import _ from 'lodash';

const INITIAL_STATE = {
  plans: {},
  loading: false,
  error: null,
  selectedPlan: null,
};

const planListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // create plan
    case PLAN_CREATE_REQUEST:
      return { ...state, loading: true };
    case PLAN_CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case PLAN_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // get plan list
    case PLAN_LIST_REQUEST:
      return { ...state, loading: true };
    case PLAN_LIST_SUCCESS: {
      const plans = _.mapKeys(action.payload, '_id');
      return { ...state, loading: false, plans: plans };
    }
    case PLAN_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // delete plan
    case PLAN_DELETE_REQUEST:
      return { ...state, loading: true };
    case PLAN_DELETE_SUCCESS: {
      const updatedPlans = _.omit(state.plans, action.payload);
      return { ...state, loading: false, plans: updatedPlans };
    }
    case PLAN_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // set selected plan
    case PLAN_SET_SELECTED: {
      return {
        ...state,
        selectedPlan: action.payload,
      };
    }
    default:
      return state;
  }
};

export default planListReducer;
