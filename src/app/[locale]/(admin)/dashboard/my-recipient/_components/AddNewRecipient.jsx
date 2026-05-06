"use client";

import { Form, Input, Select, Card } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "@/components/ui/form/FormItem";
import * as yup from "yup";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import LucideIcon from "@/components/LucideIcon";
import { useState, useEffect, useRef, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  useLazyGetSearchRecipientsQuery,
  useAddNewRecipientMutation,
  useUpdateRecipientMutation, // Ensure this exists in your API slice
} from "@/redux/api/myRecipientsApi";
import showToast from "@/lib/toast";
import { useDashboardContext } from "@/contexts/DashboardProvider";
import AddNewRecipientSkeleton from "./myRecipientSkeleton/AddRecipientSkeleton";

// ... recipientSchema and countryOptions remain the same ...
// schema moved inside component to use translations

export default function AddNewRecipient({ searchParams }) {
  const t = useTranslations("Dashboard.addNewRecipient");

  const recipientSchema = useMemo(() => {
    return yup.object({
      email: yup
        .string()
        .email(t("validation.emailInvalid"))
        .required(t("validation.emailRequired")),
      firstname: yup.string().required(t("validation.firstNameRequired")),
      lastname: yup.string().required(t("validation.lastNameRequired")),
      country: yup.string().required(t("validation.countryRequired")),
      city: yup.string().required(t("validation.cityRequired")),
      state: yup.string().required(t("validation.stateRequired")),
      zip: yup.string().required(t("validation.zipRequired")),
      address: yup.string().required(t("validation.addressRequired")),
    });
  }, [t]);

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
        title={isUpdateMode ? t("updateTitle") : t("addTitle")}
        extra={
          <button
            onClick={() => router.back()}
            className="text-primary cursor-pointer flex  items-center gap-1 bg-primary-50 dark:bg-primary-500 dark:text-white rounded-2xl border duration-200 hover:text-primary-600 hover:bg-primary-100 border-primary px-3 py-1"
          >
            <LucideIcon
              name={"ArrowLeft"}
              size={18}
              className="rtl:rotate-180"
            />
            <span className="hidden md:block">{t("back")}</span>
          </button>
        }
      >
        {/* Hide search bar if in update mode to prevent confusion, or keep it enabled */}
        {!isUpdateMode && (
          <div className="rounded-xl bg-gray-50 dark:bg-neutral-900   mb-3 p-6!">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("searchLabel")}
            </label>
            <div className="flex items-center gap-3 mt-2">
              <Input
                size="large"
                placeholder={t("searchPlaceholder")}
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
        )}

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="bg-gray-50 dark:bg-neutral-900 p-6! rounded-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <FormItem
              label={t("firstName")}
              name="firstname"
              required
              errors={errors}
            >
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder={t("firstName")} />
                )}
              />
            </FormItem>
            <FormItem
              label={t("lastName")}
              name="lastname"
              required
              errors={errors}
            >
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder={t("lastName")} />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <FormItem label={t("email")} name="email" required errors={errors}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder={t("email")}
                    disabled={isUpdateMode}
                  />
                )}
              />
            </FormItem>
            <FormItem
              label={t("address")}
              name="address"
              required
              errors={errors}
            >
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder={t("address")} />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <FormItem label={t("city")} name="city" required errors={errors}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder={t("city")} />
                )}
              />
            </FormItem>
            <FormItem label={t("state")} name="state" required errors={errors}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder={t("state")} />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <FormItem
              label={t("country")}
              name="country"
              required
              errors={errors}
            >
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder={t("selectCountry")}
                    options={countries}
                  />
                )}
              />
            </FormItem>
            <FormItem label={t("zipCode")} name="zip" required errors={errors}>
              <Controller
                name="zip"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder={t("zipCode")} />
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
            {isUpdateMode ? t("updateRecipient") : t("addNow")}
          </PrimaryButton>
        </Form>
      </Card>
    </>
  );
}
