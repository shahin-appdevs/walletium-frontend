import { axiosPublic } from "@/lib/axios";

const { baseApi } = require("./baseApi");

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        data: credentials,
        axiosInstance: axiosPublic,
      }),
      // transformResponse: (response) => response.data,
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        data: credentials,
        axiosInstance: axiosPublic,
      }),
      transformResponse: (response) => response.data,
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),

    sendForgetPasswordOtp: builder.mutation({
      query: (credentials) => ({
        url: "/password/forgot/find/user",
        method: "POST",
        data: credentials,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendForgetPasswordOtpMutation,
  useLogoutMutation,
} = authApi;
