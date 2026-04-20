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

    getManualPaymentGatewayFields: builder.query({
      query: ({ alias, lang }) => ({
        url: `/user/add-money/manual/input-fields`,
        method: "GET",
        params: { alias, lang },
      }),
    }),
    addMoneyManualSubmit: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/add-money/manual/submit",
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
  useAddMoneyManualSubmitMutation,
  useLazyGetManualPaymentGatewayFieldsQuery,
} = paymentApi;
