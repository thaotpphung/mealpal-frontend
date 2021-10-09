import { combineReducers } from 'redux';
import userReducer from './reducers/userReducers';
import planListReducer from './reducers/planReducers';
import weekListReducer from './reducers/weekReducers';
import dayListReducer from './reducers/dayReducers';
import selectReducer from './reducers/selectReducers';
import recipeListReducer from './reducers/recipeReducers';

const rootReducer = combineReducers({
  user: userReducer,
  planList: planListReducer,
  weekList: weekListReducer,
  dayList: dayListReducer,
  select: selectReducer,
  recipeList: recipeListReducer,
});

export default rootReducer;
