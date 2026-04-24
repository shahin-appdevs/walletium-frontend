import { baseApi } from "./baseApi";

const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequestMoneyTrx: builder.query({
      query: ({ page, per_page }) => ({
        url: "/user/transaction/request-money",
        method: "GET",
        params: { page, per_page },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetRequestMoneyTrxQuery } = transactionsApi;
