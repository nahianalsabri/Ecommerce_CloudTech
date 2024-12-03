import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    authToken: undefined,
    userData: undefined,
    isSignedIn: false,
    roleType: undefined,
    loginType: "hospital",
  },
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    removeUser(state) {
      state.userData = undefined;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    removeAuthToken(state) {
      state.authToken = undefined;
    },
    setAuthStatus(state, action) {
      state.isSignedIn = action.payload;
    },
    setRoleType(state, action) {
      state.roleType = action.payload;
    },
    setLoginType(state, action) {
      state.loginType = action.payload;
    },
  },
});

export const {
  setUser,
  removeUser,
  setAuthToken,
  removeAuthToken,
  setAuthStatus,
  setRoleType,
  setLoginType,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuthToken = (state) => state.user.authToken;
export const selectUser = (state) => state.user.userData;
export const selectRoleType = (state) => state.user.roleType;
export const selectLoginType = (state) => state.user.loginType;
export const selectIsSignedIn = (state) => state.user.isSignedIn;
