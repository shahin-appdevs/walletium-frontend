import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: "/user/dashboard",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getTransactions: builder.query({
      query: ({ type, page, per_page, lang }) => ({
        url: "/user/transaction/log",
        method: "GET",
        params: { slug: type, page, per_page, lang },
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const { useGetDashboardQuery, useGetTransactionsQuery } = dashboardApi;
