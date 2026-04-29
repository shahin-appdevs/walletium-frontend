import { baseApi } from "./baseApi";

const myVoucherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyVoucherIndex: builder.query({
      query: (params) => ({
        url: "/user/my-voucher/index",
        method: "GET",
        params,
      }),
    }),
    myVoucherSubmit: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/my-voucher/submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
      invalidatesTags: ["transaction"],
    }),
    myVoucherRedeemSubmit: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/my-voucher/redeem-submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
      invalidatesTags: ["transaction"],
    }),
    myVoucherCancel: builder.mutation({
      query: ({ code, lang }) => ({
        url: `/user/my-voucher/cancel/${code}`,
        method: "GET",
        params: { lang },
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const {
  useGetMyVoucherIndexQuery,
  useMyVoucherSubmitMutation,
  useMyVoucherRedeemSubmitMutation,
  useMyVoucherCancelMutation,
} = myVoucherApi;
