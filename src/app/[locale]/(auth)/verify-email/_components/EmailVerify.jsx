"use client";

import { useEffect, useRef, useState } from "react";
import { Typography, Input, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useLazyResendOtpQuery,
  useSubmitEmailVerifyCodeMutation,
} from "@/redux/api/authApi";
import showToast from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEmailVerifyToken,
  setTwoFactorStatus,
} from "@/redux/features/authSlice";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useLocale } from "next-intl";
import { token, userInfo } from "@/lib/token";

export default function EmailVerify() {
  const locale = useLocale();
  const t = useTranslations("Auth.emailVerify");
  const tc = useTranslations("common.validation");

  const schema = useMemo(
    () =>
      yup.object().shape({
        otp: yup
          .array()
          .of(
            yup
              .string()
              .matches(/^\d$/, t("must_be_number"))
              .required(tc("required")),
          )
          .length(6, t("otp_required")),
      }),
    [t, tc],
  );

  const [resendOtpTimer, setResendOtpTimer] = useState(59);
  const [pass, setPass] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { emailVerifyToken } = useSelector((state) => state.auth);
  //email verify api call
  const [submitEmailVerifyCode, { isLoading }] =
    useSubmitEmailVerifyCodeMutation();

  //resend otp api call
  const [resendOtp, { isLoading: resendOtpLoading }] = useLazyResendOtpQuery();

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

  // timer
  useEffect(() => {
    if (resendOtpTimer < 1) {
      return;
    }
    const intervalId = setInterval(() => {
      setResendOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [resendOtpTimer]);

  const inputsRef = useRef([]);

  const onSubmit = async (data) => {
    const otp = data.otp.join("");

    try {
      const res = await submitEmailVerifyCode({
        code: otp,
        token: emailVerifyToken,
      }).unwrap();
      dispatch(setTwoFactorStatus(0));
      showToast.apiSuccess(res, t("verify_success"));
      clearEmailVerifyToken(); // clear email verify token
      router.push("/dashboard");
    } catch (error) {
      showToast.apiError(error, t("verify_failed"));
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

  const handleResendOtp = async () => {
    try {
      const res = await resendOtp({
        token: emailVerifyToken,
        lang: locale,
      }).unwrap();
      showToast.apiSuccess(res, t("resend_success"));
      setResendOtpTimer(10);
    } catch (error) {
      showToast.apiError(error, t("resend_failed"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-3">
        <div className="flex justify-center">
          <Image
            src="/images/logo/web_logo.webp"
            height={50}
            width={200}
            alt="Walletium Logo"
          />
        </div>

        <Typography.Title level={3} className="text-center mb-6">
          {t("title")}
        </Typography.Title>

        <p className="text-center text-sm mb-4">{t("description")}</p>

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
            <p className="text-center text-gray-500 text-sm mt-4">
              You can resend the code after{" "}
              <span className="text-red-500 font-medium text-base">
                {resendOtpTimer}s
              </span>
            </p>
          ) : (
            <p className="text-center text-gray-500 text-sm mt-4">
              Didn’t receive the OTP?{" "}
              <Button
                onClick={handleResendOtp}
                className="text-red-500! hover:underline font-medium!"
                disabled={resendOtpLoading}
                loading={resendOtpLoading}
                type="link"
              >
                Resend
              </Button>
            </p>
          )}

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            disabled={isLoading}
            loading={isLoading}
          >
            {t("verify_button")}
          </Button>

          <p className="text-center text-gray-500 text-sm mt-4">
            {t("already_have_account")}{" "}
            <Button
              onClick={() => {
                token.remove();
                userInfo.remove();
                router.push("/login");
              }}
              className="text-primary-500 hover:underline"
              type="link"
            >
              {t("login_now")}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}
