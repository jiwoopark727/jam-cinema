import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './member';

const store = configureStore({
  reducer: {
    members: memberReducer,
  },
});

export default store;
