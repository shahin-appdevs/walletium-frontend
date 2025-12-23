"use client";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import showToast from "@/lib/toast";
import { useSendForgetPasswordOtpMutation } from "@/redux/api/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import GuestOnly from "../_components/GuestOnly";

const forgetSchema = yup.object({
  credentials: yup.string().required("Email is required"),
});

const ForgetPassword = () => {
  const [sendOtp, { isLoading }] = useSendForgetPasswordOtpMutation();
  const router = useRouter();

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

      if (!result?.error?.status) {
        throw result.error;
      }
      showToast.success("Sent OTP");
      router.replace("/otp-verification");
    } catch (err) {
      console.log();

      showToast.error(err?.data?.message?.error[0] || "Something went wrong");
    }
  };

  return (
    <GuestOnly>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-3">
          <div className="flex-center">
            <Image
              src="/images/logo/web_logo.webp"
              height={50}
              width={200}
              alt="Walletium Logo"
            />
          </div>

          <Typography.Title level={3} className="text-center mb-6">
            Reset Your Forgotten Password?
          </Typography.Title>

          <p className="text-center! text-sm!">
            Take control of your account by resetting your password. Our
            password recovery page guides you through the necessary steps to
            securely reset your password.
          </p>

          <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Email / Username */}
            <FormItem
              name={"credentials"}
              label={"Email"}
              errors={errors}
              required={true}
            >
              <Controller
                name="credentials"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter email"
                    size="large"
                    status={errors.credentials ? "error" : ""}
                  />
                )}
              />
            </FormItem>

            {/* Submit */}
            <PrimaryButton type="submit" className="w-full" loading={isLoading}>
              Send OTP
            </PrimaryButton>
          </Form>

          <p className="text-center text-gray-500 text-sm mt-4">
            Don’t have an account?{" "}
            <Link href="/login" className="text-primary-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </GuestOnly>
  );
};

export default ForgetPassword;
