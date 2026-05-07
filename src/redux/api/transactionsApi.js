import { baseApi } from "./baseApi";

const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequestMoneyTrx: builder.query({
      query: ({ page, per_page, trx_id }) => ({
        url: "/user/transaction/request-money",
        method: "GET",
        params: { page, per_page, trx_id },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["transaction"],
    }),
    getVoucherMoneyTrx: builder.query({
      query: ({ page, per_page, trx_id }) => ({
        url: "/user/transaction/voucher-money",
        method: "GET",
        params: { page, per_page, trx_id },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["transaction"],
    }),
  }),
});

export const { useGetRequestMoneyTrxQuery, useGetVoucherMoneyTrxQuery } =
  transactionsApi;
