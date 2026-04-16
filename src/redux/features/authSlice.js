"use client";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    twoFactorStatus: 0,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "authenticated";
      state.twoFactorStatus = action.payload.twoFactorStatus;
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
