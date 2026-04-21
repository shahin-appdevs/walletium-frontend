import { baseApi } from "./baseApi";

const sendMoneyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyRecipients: builder.query({
      query: ({ lang}) => ({
        url: "/user/recipient/my-recipient",
        method: "GET",
        params: { lang },
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
  }),
});

export const { useGetMyRecipientsQuery } = sendMoneyApi;
