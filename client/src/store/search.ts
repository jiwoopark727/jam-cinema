import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'member',
  initialState: {
    search: false,
  },
  reducers: {
    searchOnOff(state, action) {
      state.search = action.payload;
    },
  },
});

export const { searchOnOff } = searchSlice.actions;

export default searchSlice.reducer;
