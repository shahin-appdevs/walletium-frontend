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
import GuestOnly from "../_components/GuestOnly";
// import { useRegisterMutation } from "@/redux/api/authApi";
import { continents, countries, languages } from "countries-list";
import { useRegisterMutation } from "@/redux/api/authApi";
import { token } from "@/lib/token";

const { Option } = Select;

/* =======================
   Validation Schema
======================= */
const registerSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  country: yup.string().required("Country is required"),
  type: yup.string().required("Account type is required"),
});

/* =======================
   Component
======================= */
export default function RegisterPage() {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const allCountries = Object.values(countries).map((item) => item.name);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
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
    console.log("Register Data:", data);

    const formData = new FormData();

    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("country", data.country);
    formData.append("type", data.type);

    try {
      const result = await register(formData).unwrap();

      token.set(result?.token);

      showToast.success("Registration successful");
      router.push("/login");
    } catch (err) {
      // console.log(err);

      const message = err?.data?.message?.error[0];

      showToast.error(message || "Registration failed");
    }
  };

  return (
    <GuestOnly>
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

          <Typography.Title level={4} className="text-center">
            Register for an Account Today
          </Typography.Title>

          <p className="text-center! text-xs! md:text-sm!">
            Become a part of our community by registering for an account today.
            Enjoy a range of benefits and features tailored to meet your needs.
            Our registration page makes it easy to create your account,
            providing a seamless and user-friendly experience.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="md:flex  gap-2 space-y-3 md:space-y-0">
              {/* First Name */}
              <div>
                <label className="block mb-1 font-medium">First Name</label>
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter first name"
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
                <label className="block mb-1 font-medium">Last Name</label>
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter last name"
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
              <label className="block mb-1 font-medium">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter email"
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="md:flex gap-2  space-y-3 md:space-y-0">
              {/* Country */}
              <div className="flex-1">
                <label className="block mb-1 font-medium">Country</label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-full"
                      size="large"
                      placeholder="Select country"
                      status={errors.country ? "error" : ""}
                    >
                      <Option value="" disabled>
                        Select One
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
                <label className="block mb-1 font-medium">Account Type</label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-full"
                      size="large"
                      placeholder="Select type"
                      status={errors.type ? "error" : ""}
                    >
                      <Option value="">Select One</Option>
                      <Option value="personal">Personal Account</Option>
                      <Option value="business">Business Account</Option>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <PrimaryButton type="submit" className="w-full">
              Register
            </PrimaryButton>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </GuestOnly>
  );
}
