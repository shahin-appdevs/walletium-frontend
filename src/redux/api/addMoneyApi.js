import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentGateways: builder.query({
      query: () => ({
        url: "/user/add-money/payment-gateways",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPaymentGatewaysQuery } = paymentApi;
