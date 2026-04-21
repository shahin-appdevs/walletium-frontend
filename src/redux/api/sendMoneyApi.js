import { baseApi } from "./baseApi";

const sendMoneyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSendMoneyIndex: builder.query({
      query: ({ lang }) => ({
        url: "/user/send-money/index",
        method: "GET",
        params: { lang },
      }),
    }),
    sendMoneyAutomaticSubmit: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/add-money/automatic/submit",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),
  }),
});

export const {
  useGetSendMoneyIndexQuery,
  useSendMoneyAutomaticSubmitMutation,
} = sendMoneyApi;
