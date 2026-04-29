import { baseApi } from "./baseApi";

const exchangeMoneyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExchangeMoneyIndex: builder.query({
      query: (params) => ({
        url: "/user/exchange-money/index",
        method: "GET",
        params,
      }),
    }),
    exchangeMoneySubmit: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/exchange-money/submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const { useGetExchangeMoneyIndexQuery, useExchangeMoneySubmitMutation } =
  exchangeMoneyApi;
