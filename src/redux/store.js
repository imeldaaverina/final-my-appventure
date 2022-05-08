import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// reducers
import landing from './reducers/landing';
import login from './reducers/login';
import registration from './reducers/registration';
import account from './reducers/account';

// rootReducer
const rootReducer = combineReducers({
  landing,
  login,
  registration,
  account,
});
// store (main storage)
const store = configureStore({
  reducer: rootReducer,
});
export default store;