import { baseApi } from "./baseApi";

const sendMoneyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSendMoneyIndex: builder.query({
      query: () => ({
        url: "/user/send-money/index",
        method: "GET",
      }),
    }),
    sendMoneySubmit: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/send-money/submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),
    sendMoneyConfirm: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/send-money/recipient-submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),
  }),
});

export const {
  useGetSendMoneyIndexQuery,
  useSendMoneySubmitMutation,
  useSendMoneyConfirmMutation,
} = sendMoneyApi;
