import { baseApi } from "./baseApi";

const withdrawMoneyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWithdrawMoneyInformation: builder.query({
      query: (lang) => ({
        url: "/user/withdraw-money/index",
        method: "GET",
        params: { lang },
      }),
    }),
    withdrawMoneySubmit: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/withdraw-money/submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),

    withdrawMoneyManualConfirm: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/withdraw-money/manual/confirm",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),
  }),
});

export const {
  useGetWithdrawMoneyInformationQuery,
  useWithdrawMoneySubmitMutation,
  useWithdrawMoneyManualConfirmMutation,
} = withdrawMoneyApi;
