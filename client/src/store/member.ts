import { createSlice } from '@reduxjs/toolkit';

export interface User {
  userId: number;
  email: string;
  emoji: string;
  nickname: string;
}

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    user: {} as User,
  },
  reducers: {
    userLogin(state, action) {
      const { userId, email, emoji, nickname } = action.payload;
      state.user = {
        userId,
        email,
        emoji,
        nickname,
      } as User;
      localStorage.loging = JSON.stringify({ userId: userId });
    },

    userLogout(state, _) {
      state.user = {} as User;
      localStorage.clear();
      sessionStorage.clear();
    },
  },
});

export const { userLogin, userLogout } = memberSlice.actions;

export default memberSlice.reducer;
