import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  userSigninReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import {
  planListReducer,
  planDetailsReducer,
  planCreateReducer,
  planDeleteReducer,
  planUpdateReducer,
} from './reducers/planReducers';

const currentUser = localStorage.getItem("currentUser") || null;

const initialState = {
  userSignin: { currentUser }
};

const rootReducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  planList: planListReducer,
  planDetails: planDetailsReducer,
  planCreate: planCreateReducer,
  planDelete: planDeleteReducer,
  planUpdate: planUpdateReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;