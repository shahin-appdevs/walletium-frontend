"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Typography, Select } from "antd";
import Image from "next/image";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import showToast from "@/lib/toast";
// import { useRegisterMutation } from "@/redux/api/authApi";
import { countries } from "countries-list";
import { useRegisterMutation } from "@/redux/api/authApi";
import { token, userInfo } from "@/lib/token";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSuccessMessage } from "@/utils/getSuccessMessage";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useBasicSettings from "@/hooks/useBasicSettings";
import { useTranslations } from "next-intl";
import GuestOnly from "../../_components/GuestOnly";

const { Option } = Select;

/* =======================
   Validation Schema
======================= */
const registerSchema = (t) =>
  yup.object({
    firstname: yup.string().required(t("validation.firstNameRequired")),
    lastname: yup.string().required(t("validation.lastNameRequired")),
    email: yup
      .string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    password: yup
      .string()
      .min(6, t("validation.passwordMin"))
      .required(t("validation.passwordRequired")),
    country: yup.string().required(t("validation.countryRequired")),
    type: yup.string().required(t("validation.typeRequired")),
  });

/* =======================
   Component
======================= */
export default function Register() {
  const t = useTranslations("Auth.register");
  const { settings } = useBasicSettings();
  const basicSettingData = settings || {};
  const recaptchaKey = basicSettingData?.google_recaptcha_site_key;
  const recaptchaStatus = basicSettingData?.google_recaptcha_status;

  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const allCountries = Object.values(countries).map((item) => item.name);

  const [recaptcha, setRecaptcha] = useState(null);
  const recaptchaRef = useRef();

  const recaptchaChange = (e) => {
    setRecaptcha(e);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema(t)),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      country: "",
      type: "",
    },
  });

  const onSubmit = async (data) => {
    if (recaptchaStatus && recaptchaKey && !recaptcha) {
      showToast.warning(t("recaptchaVerify"));
      return;
    }

    const formData = new FormData();

    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("country", data.country);
    formData.append("type", data.type);

    try {
      const result = await register(formData).unwrap();

      // store data
      token.set(result?.token);
      userInfo.set(result?.user_info);
      //success message
      const successMessages = getSuccessMessage(result);
      successMessages.forEach((message) => showToast.success(message));
      //redirect
      router.replace("/dashboard");
    } catch (error) {
      // error messages
      const errMessages = getErrorMessage(error);
      errMessages.forEach((err) => {
        showToast.error(err);
      });
    }
  };

  return (
    <GuestOnly>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950 p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6 space-y-3">
          <div className="flex-center">
            <Image
              src="/images/logo/web_logo.webp"
              height={50}
              width={200}
              alt={t("logoAlt")}
            />
          </div>

          <Typography.Title level={4} className="text-center">
            {t("title")}
          </Typography.Title>

          <p className="text-center! text-xs! md:text-sm! text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="md:flex  gap-2 space-y-3 md:space-y-0">
              {/* First Name */}
              <div>
                <label className="block mb-1 font-medium text-slate-900 dark:text-white">
                  {t("firstNameLabel")}
                </label>
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={t("firstNamePlaceholder")}
                      size="large"
                      status={errors.firstname ? "error" : ""}
                    />
                  )}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block mb-1 font-medium text-slate-900 dark:text-white">
                  {t("lastNameLabel")}
                </label>
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={t("lastNamePlaceholder")}
                      size="large"
                      status={errors.last_name ? "error" : ""}
                    />
                  )}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-slate-900 dark:text-white">
                {t("emailLabel")}
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t("emailPlaceholder")}
                    size="large"
                    status={errors.email ? "error" : ""}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-slate-900 dark:text-white">
                {t("passwordLabel")}
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder={t("passwordPlaceholder")}
                    size="large"
                    status={errors.password ? "error" : ""}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="md:flex gap-2  space-y-3 md:space-y-0">
              {/* Country */}
              <div className="flex-1">
                <label className="block mb-1 font-medium text-slate-900 dark:text-white">
                  {t("countryLabel")}
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-full"
                      size="large"
                      placeholder={t("countryPlaceholder")}
                      status={errors.country ? "error" : ""}
                    >
                      <Option value="" disabled>
                        {t("selectOne")}
                      </Option>
                      {allCountries.map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Type */}
              <div className="flex-1">
                <label className="block mb-1 font-medium text-slate-900 dark:text-white">
                  {t("typeLabel")}
                </label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-full"
                      size="large"
                      placeholder={t("typePlaceholder")}
                      status={errors.type ? "error" : ""}
                    >
                      <Option value="">{t("selectOne")}</Option>
                      <Option value="personal">{t("personalAccount")}</Option>
                      <Option value="business">{t("businessAccount")}</Option>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>
            </div>

            {recaptchaStatus && recaptchaKey && (
              <div className="flex-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaKey}
                  onChange={recaptchaChange}
                />
              </div>
            )}

            {/* Submit */}
            <PrimaryButton type="submit" className="w-full" loading={isLoading}>
              {t("registerButton")}
            </PrimaryButton>
          </form>

          <p className="text-center text-gray-500 dark:text-slate-400 text-sm mt-4">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/login" className="text-primary-500 hover:underline">
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </GuestOnly>
  );
}
