import { createSlice } from '@reduxjs/toolkit';

interface User {
  userId: number;
  email: string;
  emoji: string;
  nickname: string;
}

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    user: {},
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
      console.log(state.user);
    },
    // localUser(state, action) {
    //   state.user = action.payload;
    // },
    userLogout(state, action) {
      state.user = {};
      localStorage.clear();
      console.log(state.user);
    },
  },
});

// export const { initMembers, userLogin, userLogout, localUser } =
//   memberSlice.actions;

export const { userLogin, userLogout } = memberSlice.actions;

export default memberSlice.reducer;
