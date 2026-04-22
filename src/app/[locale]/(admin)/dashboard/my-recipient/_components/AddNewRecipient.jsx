"use client";

import { Form, Input, Select, Card } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "@/components/ui/form/FormItem";
import * as yup from "yup";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import LucideIcon from "@/components/LucideIcon";
import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import {
  useLazyGetSearchRecipientsQuery,
  useAddNewRecipientMutation,
  useUpdateRecipientMutation, // Ensure this exists in your API slice
} from "@/redux/api/myRecipientsApi";
import showToast from "@/lib/toast";
import { useDashboardContext } from "@/contexts/DashboardProvider";
import AddNewRecipientSkeleton from "./myRecipientSkeleton/AddRecipientSkeleton";

// ... recipientSchema and countryOptions remain the same ...
export const recipientSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip code is required"),
  address: yup.string().required("Address is required"),
});

export default function AddNewRecipient({ searchParams }) {
  const updateUser = searchParams?.update_user; // This is the ID or Email to update
  const isUpdateMode = !!updateUser;

  const locale = useLocale();
  const router = useRouter();
  const [searchText, setSearchText] = useState(updateUser || "");
  const debounceTimer = useRef(null);
  const { profileData } = useDashboardContext();

  const countries = profileData?.countries?.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  // API Hooks
  const [searchRecipient, { isFetching: isSearching }] =
    useLazyGetSearchRecipientsQuery();
  const [addNewRecipient, { isLoading: isAdding }] =
    useAddNewRecipientMutation();
  const [updateRecipient, { isLoading: isUpdating }] =
    useUpdateRecipientMutation();

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(recipientSchema),
    defaultValues: {
      id: "",
      email: "",
      firstname: "",
      lastname: "",
      country: "",
      city: "",
      state: "",
      zip: "",
      address: "",
    },
  });

  // Function to fetch and populate data
  const handlePopulateData = async (queryText) => {
    try {
      const res = await searchRecipient({
        lang: locale,
        text: queryText,
      }).unwrap();

      const userData = res?.data?.user_data;
      if (userData) {
        reset({
          email: userData.email || "",
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          country: userData.address?.country || "",
          city: userData.address?.city || "",
          state: userData.address?.state || "",
          zip: userData.address?.zip || "",
          address: userData.address?.address || "",
        });
      }
    } catch (error) {
      showToast.apiError(error);
    }
  };

  // Initial fetch for Update Mode
  useEffect(() => {
    const updateUser = JSON.parse(sessionStorage.getItem("update_user"));

    if (!updateUser) return;

    reset({
      id: updateUser?.key || "",
      email: updateUser?.email || "",
      firstname: updateUser?.firstname || "",
      lastname: updateUser?.lastname || "",
      country: updateUser?.country || "",
      city: updateUser?.city || "",
      state: updateUser?.state || "",
      zip: updateUser?.zip_code || "",
      address: updateUser?.address || "",
    });
  }, [reset]);

  // Debounced search for manual typing
  useEffect(() => {
    if (!searchText.trim() || isUpdateMode) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      handlePopulateData(searchText);
    }, 2000);

    return () => clearTimeout(debounceTimer.current);
  }, [searchText, locale]);

  const onSubmit = async (data) => {
    try {
      let res;
      if (isUpdateMode) {
        // Logic for Update
        res = await updateRecipient({
          payload: { ...data },
          lang: locale,
        }).unwrap();
      } else {
        // Logic for Add
        res = await addNewRecipient({
          payload: data,
          lang: locale,
        }).unwrap();
      }

      showToast.apiSuccess(res);
      router.push(`/${locale}/dashboard/my-recipient`);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  if (isUpdateMode && isSearching) {
    return <AddNewRecipientSkeleton />;
  }

  return (
    <>
      <Card
        title={isUpdateMode ? "Update Recipient" : "Add New Recipient"}
        extra={
          <button
            onClick={() => router.back()}
            className="text-primary cursor-pointer flex items-center gap-1 bg-primary-50 rounded-2xl border duration-200 hover:text-primary-600 hover:bg-primary-100 border-primary px-3 py-1"
          >
            <LucideIcon name={"ArrowLeft"} size={18} />
            <span className="hidden md:block">Back</span>
          </button>
        }
      >
        {/* Hide search bar if in update mode to prevent confusion, or keep it enabled */}
        {!isUpdateMode && (
          <div className="bg-white dark:bg-neutral-900 rounded-xl mb-4 ">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Search by username or email
            </label>
            <div className="flex items-center gap-3 mt-2">
              <Input
                size="large"
                placeholder="Search by username or email..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={
                  isSearching && (
                    <LucideIcon
                      name="LoaderCircle"
                      size={18}
                      className="animate-spin text-primary"
                    />
                  )
                }
                className="flex-1"
              />
            </div>
          </div>
        )}

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="bg-white dark:bg-neutral-900 p-6 rounded-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <FormItem
              label="First Name"
              name="firstname"
              required
              errors={errors}
            >
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="First Name" />
                )}
              />
            </FormItem>
            <FormItem
              label="Last Name"
              name="lastname"
              required
              errors={errors}
            >
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="Last Name" />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <FormItem label="Email" name="email" required errors={errors}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Enter Email..."
                    disabled={isUpdateMode}
                  />
                )}
              />
            </FormItem>
            <FormItem label="Address" name="address" required errors={errors}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Enter Address..."
                  />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <FormItem label="City" name="city" required errors={errors}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="City Name" />
                )}
              />
            </FormItem>
            <FormItem label="State" name="state" required errors={errors}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="Enter State..." />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <FormItem label="Country" name="country" required errors={errors}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Select Country"
                    options={countries}
                  />
                )}
              />
            </FormItem>
            <FormItem label="Zip Code" name="zip" required errors={errors}>
              <Controller
                name="zip"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="Enter Zip..." />
                )}
              />
            </FormItem>
          </div>

          <PrimaryButton
            icon={!isSubmitting && (isUpdateMode ? "Check" : "Plus")}
            type="submit"
            loading={isSubmitting}
            className={"w-full"}
          >
            {isUpdateMode ? "Update Recipient" : "Add Now"}
          </PrimaryButton>
        </Form>
      </Card>
    </>
  );
}
