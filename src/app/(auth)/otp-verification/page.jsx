"use client";

import { useRef, useState } from "react";
import { Typography, Input, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  otp: yup
    .array()
    .of(yup.string().matches(/^\d$/, "Must be a number").required("Required"))
    .length(6, "OTP must be 6 digits"),
});

export default function OtpVerification() {
  const [pass, setPass] = useState([]);
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

  const onSubmit = (data) => {
    const otp = data.otp.join("");
    console.log("Entered OTP:", otp);
    // call your verify API here
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
          Enter OTP
        </Typography.Title>

        <p className="text-center text-sm mb-4">
          We have sent a 6-digit verification code to your email. Please enter
          it below.
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
              {errors.otp.message || "Please enter all 6 digits"}
            </p>
          )}

          <Button type="primary" htmlType="submit" className="w-full">
            Verify OTP
          </Button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Didn’t receive the OTP?{" "}
          <Link
            href="/forgot-password"
            className="text-primary-500 hover:underline"
          >
            Resend
          </Link>
        </p>
      </div>
    </div>
  );
}
