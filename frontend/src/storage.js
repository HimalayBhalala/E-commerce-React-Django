import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { loadState } from './LocalStrorage';
import { thunk } from 'redux-thunk';

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: () => [thunk]
});

export default store;