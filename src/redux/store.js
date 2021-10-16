import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';
import userReducer from './reducers/userReducers';
import weekListReducer from './reducers/weekReducers';
import dayListReducer from './reducers/dayReducers';
import mealListReducer from './reducers/mealReducers';
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

const recipePersistConfig = {
  key: 'recipeList',
  storage,
  blacklist: ['recipeImage'],
};

const rootReducer = combineReducers({
  user: userReducer,
  weekList: weekListReducer,
  dayList: dayListReducer,
  select: selectReducer,
  recipeList: persistReducer(recipePersistConfig, recipeListReducer),
  recipe: recipeDetailsReducer,
  mealList: mealListReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(persistedReducer, composeEnhancer(middlewares));

export const persistor = persistStore(store);

export default store;
