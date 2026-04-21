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
} from "@/redux/api/myRecipientsApi";
import showToast from "@/lib/toast";
import { useDashboardContext } from "@/contexts/DashboardProvider";

const { TextArea } = Input;

const countryOptions = [
  { label: "United States", value: "US" },
  { label: "Bangladesh", value: "BD" },
  { label: "India", value: "IN" },
];

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

export default function AddNewRecipient() {
  const locale = useLocale();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const debounceTimer = useRef(null);

  const { profileData } = useDashboardContext();

  const countries = profileData?.countries?.map((country) => ({
    label: country.name,
    value: country.id,
  }));

  // Search recipient API
  const [searchRecipient, { isFetching: isSearching }] =
    useLazyGetSearchRecipientsQuery();

  // Add recipient API
  const [addNewRecipient, { isLoading: isAdding }] =
    useAddNewRecipientMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(recipientSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      country: countryOptions[0].label || "",
      city: "",
      state: "",
      zip: "",
      address: "",
    },
  });

  // Debounced search - fires 3 seconds after user stops typing
  useEffect(() => {
    if (!searchText.trim()) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await searchRecipient({
          lang: locale,
          text: searchText,
        }).unwrap();

        const userData = res?.data?.user_data;
        if (userData) {
          reset({
            email: userData.email || "",
            firstname: userData.firstname || "",
            lastname: userData.lastname || "",
            country: userData.address?.country || countryOptions[0].label || "",
            city: userData.address?.city || "",
            state: userData.address?.state || "",
            zip: userData.address?.zip || "",
            address: userData.address?.address || "",
          });
          showToast.apiSuccess(res);
        }
      } catch (error) {
        showToast.apiError(error);
      }
    }, 2000);

    return () => clearTimeout(debounceTimer.current);
  }, [searchText, locale, searchRecipient, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await addNewRecipient({
        payload: data,
        lang: locale,
      }).unwrap();

      showToast.apiSuccess(res);
      router.push(`/${locale}/dashboard/my-recipient`);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  return (
    <>
      <Card
        title="Add New Recipient"
        extra={
          <button
            onClick={() => router.back()}
            className="text-primary cursor-pointer flex items-center gap-1 bg-primary-50 rounded-2xl border duration-200 hover:text-primary-600 hover:bg-primary-100 border-primary px-3 py-1"
          >
            <LucideIcon name={"ArrowLeft"} size={18} />
            <span className="hidden md:block">Back to recipient page</span>
          </button>
        }
      >
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
                <span>
                  {isSearching && (
                    <LucideIcon
                      name="LoaderCircle"
                      size={18}
                      className="animate-spin text-primary"
                    />
                  )}
                </span>
              }
              className="flex-1"
            />
          </div>
        </div>
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
                  <Input {...field} size="large" placeholder="Enter Email..." />
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
            icon={isAdding || "Plus"}
            type="submit"
            loading={isAdding}
            className={"w-full"}
            iconClassName={"group-hover/primary-btn:rotate-90 duration-200"}
          >
            Add Now
          </PrimaryButton>
        </Form>
      </Card>
    </>
  );
}
