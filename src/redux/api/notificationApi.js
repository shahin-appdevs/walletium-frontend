import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page, per_page, search, status }) => ({
        url: "/user/notifications",
        method: "GET",
        params: { page, per_page, search, status },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["notification"],
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/user/notification/read/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: "/user/notification/read-all",
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/user/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;
