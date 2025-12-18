"use client";

import { Modal, Form, Input, Upload, Avatar, Select, Space } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import LucideIcon from "@/components/LucideIcon";
import FormItem from "@/components/ui/form/FormItem";

const schema = yup.object({
  full_name: yup.string().required("Full name is required"),
  country: yup.string().required("Country is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip_code: yup.string().required("Zip code is required"),
});

const ProfileEditModal = ({ open, onClose, defaultValues }) => {
  const [avatar, setAvatar] = useState(defaultValues?.avatar || null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log("PROFILE DATA:", {
      ...data,
      avatar,
    });
    onClose();
  };

  const handleAvatarChange = (file) => {
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={640}
      closeIcon={false}
    >
      <h3 className="text-lg font-semibold mb-6">Edit Profile</h3>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <Upload showUploadList={false} beforeUpload={handleAvatarChange}>
          <div className="relative cursor-pointer">
            <Avatar
              size={96}
              src={avatar}
              className="border-2 border-primary"
            />
            <span className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
              <LucideIcon name="Camera" size={14} />
            </span>
          </div>
        </Upload>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Full Name */}
          <FormItem required={true} errors={errors} label="First Name" name="">
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </FormItem>
          {/* Last Name */}
          <FormItem required={true} errors={errors} label="Last Name" name="">
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </FormItem>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormItem required={true} errors={errors} label="Phone" name="phone">
            <Space.Compact size="large" className="w-full">
              {/* Currency Select */}

              {/* Amount Input */}
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "+880", value: "+880" },
                      { label: "+990", value: "+990" },
                    ]}
                    className="w-28!"
                  />
                )}
              />
              <Controller
                name="phoneCode"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="w-full relative">
                    <Input
                      {...field}
                      placeholder="Phone Number"
                      type="number"
                    />
                  </div>
                )}
              />
            </Space.Compact>
          </FormItem>
          {/* Country */}
          <FormItem
            required={true}
            errors={errors}
            label="Country"
            name="country"
          >
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { label: "Bangladesh", value: "Bangladesh" },
                    { label: "Saudi Arab", value: "+SoudiArab" },
                  ]}
                  className="w-full"
                  size="large"
                />
              )}
            />
          </FormItem>
        </div>
        {/* Phone */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Address */}
          <FormItem label="Address" name="">
            <Controller
              name="address"
              control={control}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </FormItem>
          {/* City */}
          <FormItem label="City" name="">
            <Controller
              name="city"
              control={control}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </FormItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* State */}
          <FormItem label="State" name="state">
            <Controller
              name="state"
              control={control}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </FormItem>

          {/* Zip */}
          <FormItem label="Zip Code" name="zip_code">
            <Controller
              name="zip_code"
              control={control}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </FormItem>
        </div>

        <PrimaryButton
          type="submit"
          //   loading={isSubmitting}
          className="w-full mt-4"
        >
          Save Changes
        </PrimaryButton>
      </Form>
    </Modal>
  );
};

export default ProfileEditModal;
