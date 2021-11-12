import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducers';
import alertListReducer from './reducers/alertReducers';
import cartReducer from './reducers/cartReducers';
import { weekListReducer, weekDetailsReducer } from './reducers/weekReducers';
import {
  recipeListReducer,
  recipeDetailsReducer,
} from './reducers/recipeReducers';
import { getEnvVars } from '../utils/envs';
const env = getEnvVars(window.location.host);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares =
  env.ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, logger);

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'],
};
const rootReducer = combineReducers({
  user: userReducer,
  weekList: weekListReducer,
  week: weekDetailsReducer,
  recipeList: recipeListReducer,
  recipe: recipeDetailsReducer,
  alertList: alertListReducer,
  cart: cartReducer,
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = createStore(persistedReducer, composeEnhancer(middlewares));
export const persistor = persistStore(store);
export default store;
