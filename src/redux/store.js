import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducers';
import { planListReducer } from './reducers/planReducers';
import { weekListReducer } from './reducers/weekReducers';

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const currentPlan = localStorage.getItem("currentPlan") || null;
const currentWeek = localStorage.getItem("currentWeek") || null;

const initialState = {
  user: { currentUser, currentPlan, currentWeek}
};

const rootReducer = combineReducers({
  user: userReducer,
  planList: planListReducer,
  weekList: weekListReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;