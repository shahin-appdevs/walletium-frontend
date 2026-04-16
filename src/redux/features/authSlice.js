"use client";
import { createSlice } from "@reduxjs/toolkit";

const getTwoFactorStatus = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("twoFactorStatus");
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    twoFactorStatus: getTwoFactorStatus(),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "authenticated";
    },

    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.status = "logged_out";
      state.twoFactorStatus = null;

      // optional cleanup
      if (typeof window !== "undefined") {
        localStorage.removeItem("twoFactorStatus");
      }
    },

    setTwoFactorStatus: (state, action) => {
      state.twoFactorStatus = action.payload;
    },
  },
});

export const { setUser, clearUser, setTwoFactorStatus } = authSlice.actions;
export default authSlice.reducer;
