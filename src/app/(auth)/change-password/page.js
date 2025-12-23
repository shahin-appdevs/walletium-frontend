"use client";

import { Modal, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";

const schema = yup.object({
  newPassword: yup
    .string()
    .required("New password is required")
    .notOneOf([yup.ref("currentPassword")], "New password must be different"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

const ChangePassword = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("PASSWORD DATA:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-3">
        <h3 className="text-lg font-semibold mb-6">Change Password</h3>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* New Password */}
          <FormItem
            name={"newPassword"}
            label="New Password"
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
                  placeholder="Enter New Password..."
                />
              )}
            />
          </FormItem>

          {/* Confirm Password */}
          <FormItem
            label="Confirm Password"
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
                  placeholder="Enter Confirm Password..."
                />
              )}
            />
          </FormItem>

          <PrimaryButton type="submit" className="w-full mt-4">
            Change
          </PrimaryButton>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
