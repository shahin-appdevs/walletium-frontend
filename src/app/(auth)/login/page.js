"use client";

import { useForm } from "react-hook-form";
import { Input, Button, Typography, message } from "antd";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    message.success("Login successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <Typography.Title level={3} className="text-center mb-6">
          Login
        </Typography.Title>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username / Email */}
          <div>
            <label className="block mb-1 font-medium">Email or Username</label>
            <Input
              placeholder="Enter email or username"
              size="large"
              {...register("identifier", {
                required: "This field is required",
              })}
            />

            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <Input.Password
              placeholder="Enter password"
              size="large"
              {...register("password", { required: "Password is required" })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
          >
            Login
          </Button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
