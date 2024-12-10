import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './member';
import searchReducer from './search';
import darkModeReducer from './darkMode';

const store = configureStore({
  reducer: {
    members: memberReducer,
    search: searchReducer,
    darkMode: darkModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
