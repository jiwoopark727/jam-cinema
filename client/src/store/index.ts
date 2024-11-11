import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './member';
import searchReducer from './search';

const store = configureStore({
  reducer: {
    members: memberReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
