"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Typography, message, Checkbox } from "antd";
import Image from "next/image";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Link from "next/link";
import * as yup from "yup";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

const loginSchema = yup.object({
  credentials: yup.string().required("Email or username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      credentials: "",
      password: "",
      remember: false,
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // message.success("Login successful!");

    const formData = new FormData();

    formData.append("credentials", data?.credentials);
    formData.append("password", data?.password);

    try {
      await login(data);
      // message.success("Login successful");
      router.push("/dashboard");
      alert("login successfully");
    } catch (error) {
      console.log(error);
      message.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-3">
        <div className="flex-center">
          <Image
            src="/images/logo/logo.png"
            height={50}
            width={50}
            alt="Walletium Logo"
          />
        </div>

        <Typography.Title level={3} className="text-center mb-6">
          Log in and Stay Connected
        </Typography.Title>

        <p className="text-center! text-sm!">
          Our secure login process ensures the confidentiality of your
          information. Log in today and stay connected to your finances, anytime
          and anywhere.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email / Username */}
          <div>
            <label className="block mb-1 font-medium">Email or Username</label>

            <Controller
              name="credentials"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter email or username"
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
            <label className="block mb-1 font-medium">Password</label>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter password"
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
                  Remember Me
                </Checkbox>
              )}
            />

            <Link href="/forget-password" className="text-primary text-sm">
              Forget Password?
            </Link>
          </div>

          {/* Submit */}
          <PrimaryButton
            type="submit"
            className="w-full"
            // loading={isSubmitting}
          >
            Login
          </PrimaryButton>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
