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

    // 2fa verify get api
    get2faInfo: builder.query({
      query: () => ({
        url: "/authorize/google/2fa/status",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),

    //2fa status update post api
    update2faStatus: builder.mutation({
      query: ({ status, params }) => ({
        url: `/authorize/google/2fa/status-update`,
        method: "POST",
        data: status,
        params: params,
      }),
    }),

    //2fa verify post api
    submit2faVerifyCode: builder.mutation({
      query: (verifyData) => ({
        url: "/authorize/google/2fa/verify",
        method: "POST",
        data: verifyData,
      }),
    }),

    // email send code post api
    emailSendVerifyCode: builder.query({
      query: () => ({
        url: "/authorize/mail/send/code",
        method: "GET",
      }),
    }),

    // email verify post api
    submitEmailVerifyCode: builder.mutation({
      query: (verifyData) => ({
        url: "/authorize/mail/verify/code",
        method: "POST",
        data: verifyData,
      }),
    }),

    //resend otp get api
    resendOtp: builder.query({
      query: ({ token, lang }) => ({
        url: `/authorize/mail/resend/code`,
        method: "GET",
        params: { token, lang },
      }),
    }),

    // send otp api
    sendForgetPasswordOtp: builder.mutation({
      query: (credentials) => ({
        url: "/password/forgot/find/user",
        method: "POST",
        data: credentials,
      }),
    }),

    // resend otp api
    resendForgetPasswordOtp: builder.mutation({
      query: ({ token, lang }) => ({
        url: "password/forgot/resend/code",
        method: "GET",
        params: { token, lang },
      }),
    }),

    // verify forget password otp api
    verifyForgetPasswordOtp: builder.mutation({
      query: ({ token, code, lang }) => ({
        url: "/password/forgot/verify/code",
        method: "POST",
        data: { token, code },
        params: { lang },
      }),
    }),

    // reset password api
    resetPassword: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/password/forgot/reset",
        method: "POST",
        data: payload,
        params: { lang },
        axiosInstance: axiosPublic,
      }),
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
  useGet2faInfoQuery,
  useUpdate2faStatusMutation,
  useSubmit2faVerifyCodeMutation,
  useLazyEmailSendVerifyCodeQuery,
  useSubmitEmailVerifyCodeMutation,
  useLazyResendOtpQuery,
  useVerifyForgetPasswordOtpMutation,
  useResendForgetPasswordOtpMutation,
  useResetPasswordMutation,
} = authApi;
