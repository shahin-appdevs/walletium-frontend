"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Typography, Checkbox } from "antd";
import Image from "next/image";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Link from "next/link";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { token, userInfo } from "@/lib/token";
import showToast from "@/lib/toast";
import { useLoginMutation } from "@/redux/api/authApi";
import ReCAPTCHA from "react-google-recaptcha";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSuccessMessage } from "@/utils/getSuccessMessage";
import { useDispatch } from "react-redux";
import {
  setEmailVerifyToken,
  setTwoFactorStatus,
} from "@/redux/features/authSlice";
import useBasicSettings from "@/hooks/useBasicSettings";
import { useTranslations } from "next-intl";

const loginSchema = (t) =>
  yup.object({
    credentials: yup.string().required(t("validation.credentialsRequired")),
    password: yup
      .string()
      .required(t("validation.passwordRequired"))
      .min(6, t("validation.passwordMin")),
  });

export default function Login() {
  const { settings } = useBasicSettings();
  const t = useTranslations("Auth.login");

  const basicSettingData = settings || {};
  const recaptchaKey = basicSettingData?.google_recaptcha_site_key;
  const recaptchaStatus = basicSettingData?.google_recaptcha_status;

  const [login, { isLoading }] = useLoginMutation();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [recaptcha, setRecaptcha] = useState(null);

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema(t)),
    defaultValues: {
      credentials: "",
      password: "",
      remember: false,
    },
  });

  const router = useRouter();
  const recaptchaRef = useRef();

  const recaptchaChange = (e) => {
    setRecaptcha(e);
  };

  const onSubmit = async (data) => {
    // console.log("Form Data:", data);

    if (!recaptcha) {
      showToast.warning(t("recaptchaVerify"));
      return;
    }

    const formData = new FormData();
    formData.append("credentials", data?.credentials);
    formData.append("password", data?.password);

    try {
      const result = await login(data).unwrap();
      const loginInfo = result?.data;

      // store data
      if (data.remember) {
        token.set(loginInfo?.token, "local");
        userInfo.set(result?.data?.user_info, "local");
      } else {
        token.set(loginInfo?.token, "session");
        userInfo.set(loginInfo?.user_info, "session");
      }

      const { email_verified, kyc_verified, two_factor_status } =
        loginInfo?.user_info || {};

      // success message
      const successMessages = getSuccessMessage(result);
      successMessages.forEach((message) => showToast.success(message));

      if (email_verified === 0) {
        dispatch(setEmailVerifyToken(loginInfo?.authorization?.token));
        router.push("/verify-email");

        return;
      } else if (kyc_verified === 0) {
        // router.push("/kyc-onboarding");
        // return;
      }

      if (two_factor_status === 1) {
        dispatch(setTwoFactorStatus(two_factor_status));
        router.push("/2fa-verify");
        return;
      }

      // redirect
      router.replace(redirect || "/dashboard");
    } catch (error) {
      const errMessages = getErrorMessage(error);
      errMessages.forEach((err) => {
        showToast.error(err);
      });
    }
  };

  return (
    // <GuestOnly>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-3">
        <div className="flex-center">
          <Image
            src="/images/logo/web_logo.webp"
            height={50}
            width={200}
            alt={t("logoAlt")}
          />
        </div>

        <Typography.Title level={3} className="text-center mb-6">
          {t("title")}
        </Typography.Title>

        <p className="text-center! text-sm!">{t("description")}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email / Username */}
          <div>
            <label className="block mb-1 font-medium">{t("emailLabel")}</label>

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

            {errors.credentials && (
              <p className="text-red-500 text-sm mt-1">
                {errors.credentials.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">
              {t("passwordLabel")}
            </label>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder={t("passwordPlaceholder")}
                  size="large"
                  status={errors.password ? "error" : ""}
                />
              )}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex-between">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox {...field} checked={field.value}>
                  {t("rememberMe")}
                </Checkbox>
              )}
            />

            <Link href="/forget-password" className="text-primary text-sm">
              {t("forgetPassword")}
            </Link>
          </div>
          {recaptchaStatus && recaptchaKey && (
            <div className="flex-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaKey}
                onChange={recaptchaChange}
              />
            </div>
          )}

          {/* Submit */}
          <PrimaryButton type="submit" className="w-full" loading={isLoading}>
            {t("loginButton")}
          </PrimaryButton>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          {t("dontHaveAccount")}{" "}
          <Link href="/register" className="text-primary-500 hover:underline">
            {t("register")}
          </Link>
        </p>
      </div>
    </div>
    // </GuestOnly>
  );
}
