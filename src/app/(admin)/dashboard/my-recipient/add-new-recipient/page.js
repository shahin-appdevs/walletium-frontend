"use client";

import { Form, Input, Select, Button, Card } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "@/components/ui/form/FormItem";
import * as yup from "yup";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import LucideIcon from "@/components/LucideIcon";

const { TextArea } = Input;

const countryOptions = [
  { label: "United States", value: "US" },
  { label: "Bangladesh", value: "BD" },
  { label: "India", value: "IN" },
];

export const recipientSchema = yup.object({
  username: yup.string().required("Username or Email is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip code is required"),
  address: yup.string().required("Address is required"),
});

export default function AddNewRecipient() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(recipientSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      country: countryOptions[0].label || "",
      city: "",
      state: "",
      zip: "",
      address: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted:", data);
  };

  const router = useRouter();

  return (
    <>
      <Card
        title="Add New Recipient"
        extra={
          <button
            onClick={() => router.back()}
            className="text-primary cursor-pointer flex items-center gap-1 bg-primary-50 rounded-2xl border duration-200 hover:text-primary-600 hover:bg-primary-100 border-primary px-3 py-1"
          >
            <LucideIcon name={"ArrowLeft"} size={18} />
            <span>Back to recipient page</span>
          </button>
        }
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="bg-white dark:bg-neutral-900 p-6 rounded-xl"
        >
          <FormItem
            label="UserName / Email"
            name="username"
            required
            errors={errors}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder="Enter Username Or Email..."
                />
              )}
            />
          </FormItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem
              label="First Name"
              name="first_name"
              required
              errors={errors}
            >
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="First Name" />
                )}
              />
            </FormItem>

            <FormItem
              label="Last Name"
              name="last_name"
              required
              errors={errors}
            >
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="Last Name" />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem label="City" name="city" required errors={errors}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="City Name" />
                )}
              />
            </FormItem>

            <FormItem label="State" name="state" required errors={errors}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="Enter State..." />
                )}
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem label="Country" name="country" required errors={errors}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Select Country"
                    options={countryOptions}
                  />
                )}
              />
            </FormItem>
            <FormItem label="Zip Code" name="zip" required errors={errors}>
              <Controller
                name="zip"
                control={control}
                render={({ field }) => (
                  <Input {...field} size="large" placeholder="Enter Zip..." />
                )}
              />
            </FormItem>
          </div>

          <FormItem label="Address" name="address" required errors={errors}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextArea {...field} rows={4} placeholder="Write Here..." />
              )}
            />
          </FormItem>

          <PrimaryButton icon="Plus" type="submit" className={"w-full"}>
            Add Now
          </PrimaryButton>
        </Form>
      </Card>
    </>
  );
}
