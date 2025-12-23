"use client";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

const forgetSchema = yup.object({
  credentials: yup.string().required("Email is required"),
});

const ForgetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgetSchema),
    defaultValues: {
      credentials: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data", data);
  };

  return (
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
          Take control of your account by resetting your password. Our password
          recovery page guides you through the necessary steps to securely reset
          your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email / Username */}
          <div>
            <label className="block mb-1 font-medium">Email</label>

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

            {errors.credentials && (
              <p className="text-red-500 text-sm mt-1">
                {errors.credentials.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <PrimaryButton
            type="submit"
            className="w-full"
            // loading={isSubmitting}
          >
            Send OTP
          </PrimaryButton>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
