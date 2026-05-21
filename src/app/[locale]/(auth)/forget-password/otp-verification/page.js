"use client";

import { useMemo, useRef, useState } from "react";
import { Typography, Input, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  useResendForgetPasswordOtpMutation,
  useVerifyForgetPasswordOtpMutation,
} from "@/redux/api/authApi";
import { useLocale, useTranslations } from "next-intl";
import showToast from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useResendOtpTimer } from "@/hooks/useResendOtpTimer";
import {
  clearForgetPasswordToken,
  setOtpVerifiedForgetPasswordToken,
} from "@/redux/features/authSlice";

export default function OtpVerification() {
  const t = useTranslations("Auth.otpVerification");
  const [pass, setPass] = useState([]);
  const { forgetPasswordToken } = useSelector((state) => state.auth);
  const [verifyForgetPasswordOtp, { isLoading }] =
    useVerifyForgetPasswordOtpMutation();
  const locale = useLocale();
  const router = useRouter();
  const { resendOtpTimer } = useResendOtpTimer(59);
  const [resendForgetPasswordOtp, { isLoading: resendOtpLoading }] =
    useResendForgetPasswordOtpMutation();
  const dispatch = useDispatch();

  const schema = useMemo(
    () =>
      yup.object().shape({
        otp: yup
          .array()
          .of(
            yup
              .string()
              .matches(/^\d$/, t("must_be_number"))
              .required(t("required"))
          )
          .length(6, t("otp_required")),
      }),
    [t]
  );

  // form handler
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { otp: ["", "", "", "", "", ""] },
    resolver: yupResolver(schema),
  });

  const inputsRef = useRef([]);

  const onSubmit = async (data) => {
    const otp = data.otp.join("");

    const formData = {
      token: forgetPasswordToken,
      code: otp,
    };

    try {
      const result = await verifyForgetPasswordOtp({
        ...formData,
        lang: locale,
      }).unwrap();

      showToast.apiSuccess(result);

      dispatch(setOtpVerifiedForgetPasswordToken(result?.data?.token));
      dispatch(clearForgetPasswordToken());

      router.push(`/forget-password/reset-password`);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");

    setPass(pasteData);

    pasteData.forEach((digit, idx) => {
      setValue(`otp.${idx}`, digit);

      if (inputsRef.current[idx]) {
        inputsRef.current[idx].value = digit;
      }
    });
    const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputsRef.current[nextIndex].focus();
  };

  // Handle individual input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      setValue(`otp.${index}`, value);
      if (value !== "" && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // resend otp handler
  const handleResendOtp = async () => {
    try {
      const result = await resendForgetPasswordOtp({
        token: forgetPasswordToken,
        lang: locale,
      }).unwrap();

      showToast.apiSuccess(result, t("resend_success"));
    } catch (error) {
      showToast.apiError(error, t("resend_failed"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6 space-y-3">
        <div className="flex justify-center">
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

        <p className="text-center text-sm mb-4 text-slate-600 dark:text-slate-300">
          {t("description")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="otp"
            control={control}
            render={() => (
              <div className="flex justify-between space-x-2 gap-2">
                {[...Array(6)].map((_, index) => (
                  <Input
                    size="large"
                    key={index}
                    maxLength={1}
                    value={pass[index]}
                    className="text-center text-lg"
                    ref={(el) => (inputsRef.current[index] = el)}
                    onPaste={handlePaste}
                    onChange={(e) => {
                      handleChange(e, index);

                      const otp = pass;
                      delete otp[index];
                      setPass([...otp]);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
            )}
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {errors.otp.message || t("six_digits_required")}
            </p>
          )}

          {resendOtpTimer > 0 ? (
            <p className="text-center text-gray-500 dark:text-slate-400 text-sm mt-4">
              {t("resend_timer_prefix")}{" "}
              <span className="text-red-500 font-medium text-base">
                {resendOtpTimer}s
              </span>
            </p>
          ) : (
            <p className="text-center text-gray-500 dark:text-slate-400 text-sm mt-4">
              {t("didnt_receive_otp")}{" "}
              <Button
                onClick={handleResendOtp}
                className="text-red-500! hover:underline font-medium!"
                disabled={resendOtpLoading}
                loading={resendOtpLoading}
                type="link"
              >
                {t("resend")}
              </Button>
            </p>
          )}

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isLoading}
          >
            {t("verify_button")}
          </Button>

          <p className="text-center text-gray-500 dark:text-slate-400 text-sm mt-4">
            {t("already_have_account")}{" "}
            <Link href="/login" className="text-primary-500 hover:underline">
              {t("login_now")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
