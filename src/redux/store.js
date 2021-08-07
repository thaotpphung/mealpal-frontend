import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  userSigninReducer,
  userRegisterReducer,
} from './reducers/userReducers';

const currentUser = localStorage.getItem("currentUser") || null;

const initialState = {
  userSignin: { currentUser }
};

const rootReducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;