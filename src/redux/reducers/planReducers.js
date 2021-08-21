import { 
PLAN_LIST_REQUEST,
PLAN_LIST_SUCCESS,
PLAN_LIST_FAIL,

PLAN_DETAILS_REQUEST,
PLAN_DETAILS_SUCCESS,
PLAN_DETAILS_FAIL,
  
PLAN_CREATE_REQUEST,
PLAN_CREATE_SUCCESS,
PLAN_CREATE_FAIL,
  
PLAN_DELETE_REQUEST,
PLAN_DELETE_SUCCESS,
PLAN_DELETE_FAIL,
  
PLAN_UPDATE_REQUEST,
PLAN_UPDATE_SUCCESS,
PLAN_UPDATE_FAIL,

} from '../constants/planConstants';

const planCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAN_CREATE_REQUEST:
      return { loading: true };
    case PLAN_CREATE_SUCCESS:
      console.log('create success reducer', action.payload);
      return { loading: false, plan: action.payload, success: true };
    case PLAN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

const planListReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAN_LIST_REQUEST:
      return { loading: true };
    case PLAN_LIST_SUCCESS:
      return { loading: false, plan: action.payload };
    case PLAN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

const planDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAN_DETAILS_REQUEST:
      return { loading: true };
    case PLAN_DETAILS_SUCCESS:
      return { loading: false, plan: action.payload };
    case PLAN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

const planDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAN_DELETE_REQUEST:
      return { loading: true };
    case PLAN_DELETE_SUCCESS:
      return { loading: false, plan: action.payload };
    case PLAN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

const planUpdateReducer = (state = { plans: [] }, action) => {
  switch (action.type) {
    case PLAN_UPDATE_REQUEST:
      return { loading: true };
    case PLAN_UPDATE_SUCCESS:
      return { loading: false, plan: action.payload };
    case PLAN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


export {
  planListReducer,
  planDetailsReducer,
  planCreateReducer,
  planDeleteReducer,
  planUpdateReducer,
};