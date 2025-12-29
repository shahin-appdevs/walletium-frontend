import { axiosPublic } from "@/lib/axios";

const { baseApi } = require("./baseApi");

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login api
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        data: credentials,
        axiosInstance: axiosPublic,
      }),
      // transformResponse: (response) => response.data,
    }),
    // register api
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        data: credentials,
        axiosInstance: axiosPublic,
      }),
      transformResponse: (response) => response.data,
    }),

    // logout api
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),

    // send otp api
    sendForgetPasswordOtp: builder.mutation({
      query: (credentials) => ({
        url: "/password/forgot/find/user",
        method: "POST",
        data: credentials,
      }),
      transformResponse: (response) => response.data,
    }),

    // kyc verification api
    getKycInputFields: builder.query({
      query: () => ({
        url: "/authorize/kyc/input-fields",
        method: "GET",
      }),
    }),
    submitKycVerification: builder.mutation({
      query: (verificationData) => ({
        url: "/authorize/kyc/submit",
        method: "POST",
        data: verificationData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendForgetPasswordOtpMutation,
  useLogoutMutation,
  useGetKycInputFieldsQuery,
  useSubmitKycVerificationMutation,
} = authApi;
