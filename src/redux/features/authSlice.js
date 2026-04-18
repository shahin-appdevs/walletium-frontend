"use client";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    twoFactorStatus: 0,
    emailVerifyToken: null,
    forgetPasswordToken: null,
    otpVerifiedForgetPasswordToken: null,
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

    setEmailVerifyToken: (state, action) => {
      state.emailVerifyToken = action.payload;
    },

    clearEmailVerifyToken: (state) => {
      state.emailVerifyToken = null;
    },

    setForgetPasswordToken: (state, action) => {
      state.forgetPasswordToken = action.payload;
    },

    clearForgetPasswordToken: (state) => {
      state.forgetPasswordToken = null;
    },

    setOtpVerifiedForgetPasswordToken: (state, action) => {
      state.otpVerifiedForgetPasswordToken = action.payload;
    },

    clearOtpVerifiedForgetPasswordToken: (state) => {
      state.otpVerifiedForgetPasswordToken = null;
    },
  },
});

export const {
  setUser,
  clearUser,
  setTwoFactorStatus,
  setEmailVerifyToken,
  clearEmailVerifyToken,
  setForgetPasswordToken,
  clearForgetPasswordToken,
  setOtpVerifiedForgetPasswordToken,
  clearOtpVerifiedForgetPasswordToken,
} = authSlice.actions;

export default authSlice.reducer;
