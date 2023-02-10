import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import details from './reducers/userDetails';

const combinedReducer = combineReducers({
  details
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer
});
