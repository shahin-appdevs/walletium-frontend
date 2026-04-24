import { baseApi } from "./baseApi";

const requestMoneyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequestMoneyIndex: builder.query({
      query: () => ({
        url: "/user/request-money/index",
        method: "GET",
      }),
    }),
    requestMoneySubmit: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/request-money/submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),
    getRequestMoneyInformation: builder.query({
      query: ({ token, lang }) => ({
        url: "/user/request-money/information",
        method: "GET",
        params: { token, lang },
      }),
    }),
    requestMoneyConfirm: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/request-money/payment-submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),
  }),
});

export const {
  useGetRequestMoneyIndexQuery,
  useRequestMoneySubmitMutation,
  useGetRequestMoneyInformationQuery,
  useRequestMoneyConfirmMutation,
} = requestMoneyApi;
