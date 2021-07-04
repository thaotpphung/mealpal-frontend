import { PLAN_LIST_REQUEST, PLAN_LIST_SUCCESS, PLAN_LIST_FAIL, PLAN_SELECT } from '../constants/planConstants';

export const onSelectPlan = payload => {
  return {
    type: PLAN_SELECT,
    payload
  }
}