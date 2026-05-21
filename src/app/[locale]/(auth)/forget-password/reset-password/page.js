"use client";

import { useMemo } from "react";
import { Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import showToast from "@/lib/toast";
import { useDispatch, useSelector } from "react-redux";
import { clearOtpVerifiedForgetPasswordToken } from "@/redux/features/authSlice";

const ResetPassword = ({}) => {
  const t = useTranslations("Auth.resetPassword");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { otpVerifiedForgetPasswordToken } = useSelector((state) => state.auth);
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = useMemo(
    () =>
      yup.object({
        newPassword: yup
          .string()
          .required(t("validation.newPasswordRequired"))
          .notOneOf(
            [yup.ref("currentPassword")],
            t("validation.newPasswordMustDiffer")
          ),
        confirmPassword: yup
          .string()
          .required(t("validation.confirmPasswordRequired"))
          .oneOf([yup.ref("newPassword")], t("validation.passwordsMustMatch")),
      }),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const payload = {
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
      token: otpVerifiedForgetPasswordToken,
    };

    try {
      const res = await resetPassword({ payload, lang: locale }).unwrap();
      showToast.apiSuccess(res);
      dispatch(clearOtpVerifiedForgetPasswordToken());
      router.push(`/login`);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6 space-y-3">
        <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">
          {t("title")}
        </h3>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* New Password */}
          <FormItem
            name={"newPassword"}
            label={
              <span className="text-slate-900 dark:text-white">
                {t("newPasswordLabel")}
              </span>
            }
            required={true}
            errors={errors}
          >
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder={t("newPasswordPlaceholder")}
                />
              )}
            />
          </FormItem>

          {/* Confirm Password */}
          <FormItem
            label={
              <span className="text-slate-900 dark:text-white">
                {t("confirmPasswordLabel")}
              </span>
            }
            name={"confirmPassword"}
            required={true}
            errors={errors}
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder={t("confirmPasswordPlaceholder")}
                />
              )}
            />
          </FormItem>

          <PrimaryButton
            type="submit"
            className="w-full mt-4"
            loading={isLoading}
          >
            {t("submitButton")}
          </PrimaryButton>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
