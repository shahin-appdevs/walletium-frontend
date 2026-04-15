"use client";

import { Card, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import FormItem from "@/components/ui/form/FormItem";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import LucideIcon from "@/components/LucideIcon";
import { useRouter } from "next/navigation";
import DynamicVerificationForm from "./VerificationForm";

const schema = yup.object({
  drivingLicense: yup.string().nullable(),
  passport: yup.string().nullable(),
  nid: yup.string().nullable(),
});

const KYCVerification = ({ inputFields, verifyRefetch }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    // mode: "onTouched",
    defaultValues: {
      drivingLicense: "",
      passport: "",
      nid: "",
    },
  });

  const onSubmit = (data) => {
    const hasAny =
      data.drivingLicense?.trim() || data.passport?.trim() || data.nid?.trim();

    if (!hasAny) {
      setError("root", {
        type: "manual",
        message: "At least one document is required",
      });
      return;
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          KYC Verification{" "}
          <span className="text-sm text-pink-600 font-normal">
            ● Unverified
          </span>
        </h2>
        <p className="text-gray-500 mt-1">
          Please submit your KYC information with valid data.
        </p>
      </div>

      {/* verification form */}
      <DynamicVerificationForm
        inputFields={inputFields}
        verifyRefetch={verifyRefetch}
      />
      {/* Back Link */}
      <div className="mt-4">
        <Link href="/dashboard">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-primary cursor-pointer flex items-center gap-1 bg-primary-50 rounded-2xl border duration-200 hover:text-primary-600 hover:bg-primary-100 border-primary px-3 py-1"
          >
            <LucideIcon name={"ArrowLeft"} size={18} />
            <span className="hidden md:block">Back to Dashboard</span>
          </button>
        </Link>
      </div>
    </Card>
  );
};

export default KYCVerification;

// <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
//         {/* Driving License */}
//         <FormItem name="drivingLicense" label="Driving License">
//           <Controller
//             name="drivingLicense"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 {...field}
//                 size="large"
//                 placeholder="Enter Driving License"
//               />
//             )}
//           />
//         </FormItem>

//         {/* Passport */}
//         <FormItem name="passport" label="Passport">
//           <Controller
//             name="passport"
//             control={control}
//             render={({ field }) => (
//               <Input {...field} size="large" placeholder="Type Here..." />
//             )}
//           />
//         </FormItem>

//         {/* NID */}
//         <FormItem name="nid" label="NID">
//           <Controller
//             name="nid"
//             control={control}
//             render={({ field }) => (
//               <Input {...field} size="large" placeholder="Type Here..." />
//             )}
//           />
//         </FormItem>
//         {errors?.root?.message && (
//           <p className="text-red-500 text-sm mb-3">{errors.root.message}</p>
//         )}
//         {/* Submit Button */}
//         <PrimaryButton type="submit" className="w-full ">
//           Submit
//         </PrimaryButton>
//       </Form>
