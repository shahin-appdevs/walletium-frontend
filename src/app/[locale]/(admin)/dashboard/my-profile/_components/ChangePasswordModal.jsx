"use client";

import { Modal, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import { useUpdatePasswordMutation } from "@/redux/api/profileApi";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSuccessMessage } from "@/utils/getSuccessMessage";
import showToast from "@/lib/toast";
import { LoaderCircle } from "lucide-react";

import { useTranslations } from "next-intl";

const ChangePasswordModal = ({ open, onClose }) => {
  const t = useTranslations("Dashboard.myProfile");
  const schema = yup.object({
    currentPassword: yup
      .string()
      .required(t("validation.currentPasswordRequired")),
    newPassword: yup
      .string()
      .required(t("validation.newPasswordRequired"))
      .notOneOf([yup.ref("currentPassword")], t("validation.newPasswordDifferent")),
    confirmPassword: yup
      .string()
      .required(t("validation.confirmPasswordRequired"))
      .oneOf([yup.ref("newPassword")], t("validation.passwordsDoNotMatch")),
  });

  const [updatePassword, { data, isLoading }] = useUpdatePasswordMutation();
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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("current_password", data?.currentPassword);
      formData.append("password", data?.newPassword);
      formData.append("password_confirmation", data?.newPassword);

      const result = await updatePassword(formData).unwrap();

      const successMessages = getSuccessMessage(result);
      successMessages.forEach((message) => showToast.success(message));

      reset({});
    } catch (error) {
      const errors = getErrorMessage(error);
      errors.forEach((err) => {
        showToast.error(err);
      });
    }

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
      <h3 className="text-lg font-semibold mb-6">{t("changePasswordTitle")}</h3>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Current Password */}
        <FormItem
          label={t("currentPassword")}
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
                placeholder={t("enterPasswordPlaceholder")}
              />
            )}
          />
        </FormItem>

        {/* New Password */}
        <FormItem
          name={"newPassword"}
          label={t("newPassword")}
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
                placeholder={t("enterNewPasswordPlaceholder")}
              />
            )}
          />
        </FormItem>

        {/* Confirm Password */}
        <FormItem
          label={t("confirmPassword")}
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
                placeholder={t("enterConfirmPasswordPlaceholder")}
              />
            )}
          />
        </FormItem>

        <PrimaryButton type="submit" className="w-full mt-4">
          {isSubmitting ? (
            <LoaderCircle className="animate-spin text-white" />
          ) : (
            t("change")
          )}
        </PrimaryButton>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
