import { baseApi } from "./baseApi";

const recipientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyRecipients: builder.query({
      query: () => ({
        url: "/user/recipient/my-recipient",
        method: "GET",
      }),
      providesTags: ["recipients"],
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
      invalidatesTags: ["recipients"],
    }),
    deleteRecipient: builder.mutation({
      query: ({ target, lang }) => ({
        url: "/user/recipient/delete",
        method: "DELETE",
        params: { target, lang },
      }),
      invalidatesTags: ["recipients"],
    }),
    updateRecipient: builder.mutation({
      query: ({ payload, lang }) => ({
        url: `/user/recipient/update`,
        method: "POST",
        data: payload,
        params: { lang },
      }),
      invalidatesTags: ["recipients"],
    }),
  }),
});

export const {
  useGetMyRecipientsQuery,
  useGetSearchRecipientsQuery,
  useLazyGetSearchRecipientsQuery,
  useAddNewRecipientMutation,
  useDeleteRecipientMutation,
  useUpdateRecipientMutation,
} = recipientApi;
