import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from '../features/service/serviceSlice.js';

const store = configureStore({
  reducer: {
    service: serviceReducer,
  },
});

export default store;
