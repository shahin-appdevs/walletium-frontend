"use client";

import { Modal, Form, Input, Upload, Avatar, Select, Space } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import LucideIcon from "@/components/LucideIcon";
import FormItem from "@/components/ui/form/FormItem";
import { useUpdateProfileMutation } from "@/redux/api/profileApi";
import showToast from "@/lib/toast";
import { useDashboardContext } from "@/contexts/DashboardProvider";
import { getSuccessMessage } from "@/utils/getSuccessMessage";

const schema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  country: yup.string().required("Country is required"),
  mobile: yup.string().required("Phone is required"),
  address: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zip_code: yup.string().optional(),
});

const ProfileEditModal = ({
  userInfo,
  open,
  onClose,
  countries,
  profileRefetch,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { dashboardRefetch } = useDashboardContext();

  const countriesName = countries.map((country) => ({
    label: country.country_name,
    value: country.country_name,
  }));

  const {
    email = "",
    firstname = "",
    lastname = "",
    country = "",
    address = "",
    mobile = "",
    city = "",
    state = "",
    zip_code = "",
    mobile_code = "",
    profileImage,
  } = userInfo || {};

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {},
  });

  useEffect(() => {
    reset({
      email,
      firstname,
      lastname,
      country,
      address,
      mobile,
      city,
      state,
      zip_code,
      mobile_code: mobile_code,
      // mobile_code: mobile_code.startsWith("+")
      //   ? `${mobile_code}`
      //   : `+${mobile_code}`,
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("address", data?.address);
      formData.append("city", data?.city);
      formData.append("country", data?.country);
      formData.append("email", data?.email);
      formData.append("firstname", data?.firstname);
      formData.append("lastname", data?.lastname);
      formData.append("mobile", data?.mobile);
      formData.append("mobile_code", data?.mobile_code);
      formData.append("state", data?.state);
      formData.append("zip_code", data?.zip_code);
      if (data?.image) {
        formData.append("image", data?.image);
      }

      const result = await updateProfile(formData).unwrap();

      const successMessages = getSuccessMessage(result);
      successMessages.forEach((message) => showToast.success(message));

      profileRefetch();
      dashboardRefetch();

      onClose();
    } catch (err) {
      showToast.error(err?.data?.message?.error[0] || "Something went wrong");
    }
  };

  const handleAvatarChange = (file) => {
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);

    setValue("image", file);

    return false;
  };

  const handleCountryChange = (value) => {
    const code = countries.find((country) => country.country_name === value);
    setValue("mobile_code", code.mobile_code);
    setValue("country", value);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={640}
      closeIcon={true}
    >
      <h3 className="text-lg font-semibold mb-6">Edit Profile</h3>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <Upload showUploadList={false} beforeUpload={handleAvatarChange}>
          <div className="relative cursor-pointer">
            <Avatar
              size={96}
              src={avatar || profileImage}
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
              name="firstname"
              control={control}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </FormItem>
          {/* Last Name */}
          <FormItem required={true} errors={errors} label="Last Name" name="">
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => <Input {...field} size="large" />}
            />
          </FormItem>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                  onChange={handleCountryChange}
                  options={[...countriesName]}
                  className="w-full"
                  size="large"
                />
              )}
            />
          </FormItem>
          <FormItem required={true} errors={errors} label="Phone" name="mobile">
            <Space.Compact size="large" className="w-full">
              {/* Currency Select */}

              {/* Amount Input */}
              <Controller
                name="mobile_code"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[]}
                    className="w-28! "
                    open={false}
                  />
                )}
              />
              <Controller
                name="mobile"
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
          loading={isLoading}
          className="w-full mt-4"
        >
          Save Changes
        </PrimaryButton>
      </Form>
    </Modal>
  );
};

export default ProfileEditModal;

// const countryCodes = countries?.map((country) => {
//   return {
//     label: country.mobile_code,
//     value: country.mobile_code,
//   };

//   // return {
//   //   label: country.mobile_code?.startsWith("+")
//   //     ? country.mobile_code
//   //     : `+${country.mobile_code}`,
//   //   value: country.mobile_code?.startsWith("+")
//   //     ? country.mobile_code
//   //     : `+${country.mobile_code}`,
//   // };
// });

// const uniqueCountryCodes = [
//   ...new Map(countryCodes.map((u) => [u.label, u])).values(),
// ];
