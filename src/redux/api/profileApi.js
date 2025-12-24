const { baseApi } = require("./baseApi");

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile/info",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/user/profile/info/update",
        method: "POST",
        data: profileData,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
