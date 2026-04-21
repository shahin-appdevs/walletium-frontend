import { baseApi } from "./baseApi";

const sendMoneyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyRecipients: builder.query({
      query: ({ lang }) => ({
        url: "/user/recipient/my-recipient",
        method: "GET",
        params: { lang },
      }),
    }),
    getSearchRecipients: builder.query({
      query: ({ lang, text }) => ({
        url: `/user/recipient/user-search`,
        method: "GET",
        params: { lang, text },
      }),
    }),

    addNewRecipient: builder.mutation({
      query: ({ payload, lang }) => ({
        url: "/user/recipient/store-recipient",
        method: "POST",
        data: payload,
        params: { lang },
      }),
    }),
  }),
});

export const {
  useGetMyRecipientsQuery,
  useGetSearchRecipientsQuery,
  useLazyGetSearchRecipientsQuery,
  useAddNewRecipientMutation,
} = sendMoneyApi;
