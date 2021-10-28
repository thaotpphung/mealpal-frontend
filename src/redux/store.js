import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducers';
import { weekListReducer, weekDetailsReducer } from './reducers/weekReducers';
import dayListReducer from './reducers/dayReducers';
import selectReducer from './reducers/selectReducers';
import {
  recipeListReducer,
  recipeDetailsReducer,
} from './reducers/recipeReducers';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = applyMiddleware(thunk, logger);
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'dayList', 'select'],
};
const rootReducer = combineReducers({
  user: userReducer,
  weekList: weekListReducer,
  weekDetails: weekDetailsReducer,
  dayList: dayListReducer,
  select: selectReducer,
  recipeList: recipeListReducer,
  recipe: recipeDetailsReducer,
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = createStore(persistedReducer, composeEnhancer(middlewares));
export const persistor = persistStore(store);
export default store;
