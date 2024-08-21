import { createSlice } from '@reduxjs/toolkit';

interface User {
  userId: string;
  userPw: string;
  userName: string;
  zipCode: string;
  addr1: string;
  addr2: string;
}

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    user: {}, // { userId, userPw, userName, zipCode, addr1, addr2}
  },
  reducers: {
    userLogin(state, action) {
      const { userId, userPw, userName, zipCode, addr1, addr2 } =
        action.payload;
      state.user = {
        userId,
        userPw,
        userName,
        zipCode,
        addr1,
        addr2,
      } as User;
      localStorage.loging = JSON.stringify({ userId: userId });
      console.log(state.user);
    },
    // localUser(state, action) {
    //   state.user = action.payload;
    // },
    // userLogout(state, action) {
    //   state.user = null;
    //   localStorage.clear();
    // },
  },
});

// export const { initMembers, userLogin, userLogout, localUser } =
//   memberSlice.actions;

export const { userLogin } = memberSlice.actions;

export default memberSlice.reducer;
