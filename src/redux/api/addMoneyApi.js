import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentGateways: builder.query({
      query: () => ({
        url: "/user/add-money/payment-gateways",
        method: "GET",
      }),
    }),
    addMoneyAutomaticSubmit: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/add-money/automatic/submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),
    addMoneyManual: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/add-money/manual",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),
  }),
});

export const {
  useGetPaymentGatewaysQuery,
  useAddMoneyAutomaticSubmitMutation,
  useAddMoneyManualMutation,
} = paymentApi;
