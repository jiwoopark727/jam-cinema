import { createSlice } from '@reduxjs/toolkit';

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    dark: false,
  },
  reducers: {
    switchDarkLight(state, action) {
      state.dark = action.payload;
    },
  },
});

export const { switchDarkLight } = darkModeSlice.actions;

export default darkModeSlice.reducer;
