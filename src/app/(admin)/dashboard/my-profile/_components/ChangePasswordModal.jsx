"use client";

import { Modal, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";

const schema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .notOneOf([yup.ref("currentPassword")], "New password must be different"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

const ChangePasswordModal = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("PASSWORD DATA:", data);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closeIcon={false}
      width={520}
    >
      <h3 className="text-lg font-semibold mb-6">Change Password</h3>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Current Password */}
        <FormItem
          label="Current Password"
          required={true}
          name={"currentPassword"}
          errors={errors}
        >
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                placeholder="Enter Password..."
              />
            )}
          />
        </FormItem>

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
    </Modal>
  );
};

export default ChangePasswordModal;
