"use client";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import showToast from "@/lib/toast";
import { useSendForgetPasswordOtpMutation } from "@/redux/api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import GuestOnly from "../_components/GuestOnly";
import { useDispatch } from "react-redux";
import { setForgetPasswordToken } from "@/redux/features/authSlice";

const ForgetPassword = () => {
  const t = useTranslations("Auth.forgetPassword");
  const [sendOtp, { isLoading }] = useSendForgetPasswordOtpMutation();
  const dispatch = useDispatch();

  const router = useRouter();

  const forgetSchema = useMemo(
    () =>
      yup.object({
        credentials: yup.string().required(t("validation.emailRequired")),
      }),
    [t],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetSchema),
    defaultValues: {
      credentials: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("credentials", data.credentials);

    try {
      const result = await sendOtp(formData);
      dispatch(setForgetPasswordToken(result?.data?.data?.token));

      showToast.apiSuccess(result.data);
      router.replace("/forget-password/otp-verification");
    } catch (err) {
      showToast.apiError(err, t("errorToast"));
    }
  };

  return (
    <GuestOnly>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950 p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6 space-y-3">
          <div className="flex-center">
            <Image
              src="/images/logo/web_logo.webp"
              height={50}
              width={200}
              alt={t("logoAlt")}
            />
          </div>

          <Typography.Title
            level={3}
            className="text-center mb-6 dark:text-white!"
          >
            {t("title")}
          </Typography.Title>

          <p className="text-center! text-sm! text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>

          <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Email / Username */}
            <FormItem
              name={"credentials"}
              label={
                <span className="text-slate-900 dark:text-white">
                  {t("emailLabel")}
                </span>
              }
              errors={errors}
              required={true}
            >
              <Controller
                name="credentials"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t("emailPlaceholder")}
                    size="large"
                    status={errors.credentials ? "error" : ""}
                  />
                )}
              />
            </FormItem>

            {/* Submit */}
            <PrimaryButton type="submit" className="w-full" loading={isLoading}>
              {t("sendOtpButton")}
            </PrimaryButton>
          </Form>

          <p className="text-center text-gray-500 dark:text-slate-400 text-sm mt-4">
            {t("dontHaveAccount")}{" "}
            <Link href="/login" className="text-primary-500 hover:underline">
              {t("loginLink")}
            </Link>
          </p>
        </div>
      </div>
    </GuestOnly>
  );
};

export default ForgetPassword;
