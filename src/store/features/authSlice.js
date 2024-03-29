import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login: (state, action) => ({
      ...state,
      isAuthenticated: true,
      user: action.payload,
    }),
    logout: (state, action) => ({
      ...state,
      isAuthenticated: false,
      user: null,
    }),
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
