"use client";
import React from "react";
import { Card, Form, Input, Select, Space } from "antd";
import { ArrowUpRight, DollarSign } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import AddMoneyTransaction from "./_components/Transaction/AddMoneyTransaction";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "@/components/ui/form/FormItem";

const addMoneySchema = yup.object({
  amount: yup.string().required("Amount is required"),
  payment_gateway: yup.string().required("Payment gateway is required"),
});

const AddMoney = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addMoneySchema),
    defaultValues: {
      currency: "USD",
      amount: "",
      payment_gateway: "Paypal USD",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const singleTable = [
    { label: "Entered Amount", value: "$50" },
    { label: "Conversion Amount", value: "$50" },
    { label: "Total Fees & Charges", value: "$100" },
    {
      label: <span className="font-bold lg:text-lg">Total Payable Amount</span>,
      value: <span className="font-bold lg:text-lg">$ 200</span>,
    },
  ];

  return (
    <section>
      <div className="space-y-4 lg:space-y-6">
        <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
          <div className="col-span-1 md:col-span-3 ">
            <Card title="Add Money">
              {/* <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Add Money
              </h2> */}
              {/* <div className="border  inline-block border-primary/50 rounded-2xl p-4">
              <h6 className="font-medium">Exchange Rate:</h6>
              <h2 className="text-lg lg:text-xl font-medium">
                1 USD = 1.000 USDT
              </h2>
            </div> */}
              <div className="bg-white mb-4 dark:bg-slate-900 dark:border dark:border-neutral-700 rounded-2xl shadow-sm p-4 flex flex-col gap-3 overflow-hidden">
                {/* Icon Section */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center bg-primary-50! dark:bg-primary-500! border border-primary/50`}
                  >
                    <DollarSign className="w-4 h-4 text-primary dark:text-primary-50! " />
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center  bg-primary-50! dark:bg-primary-500! border border-primary/50`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-primary  dark:text-primary-50! " />
                  </div>
                </div>

                {/* Text Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="border-primary/50 border rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">Exchange Rate</p>
                    <p className="text-base lg:text-xl text-neutral-800 dark:text-neutral-300 font-semibold">
                      1 USD = 1.000 USDT
                    </p>
                  </div>
                  <div className="border-primary/50 border rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">Available balance:</p>
                    <p className="text-base lg:text-xl text-neutral-800 dark:text-neutral-300 font-semibold">
                      $909.74
                    </p>
                  </div>
                </div>
              </div>

              {/* form start */}
              <div className="rounded-2xl shadow-sm p-4 ">
                <Form
                  onFinish={handleSubmit(onSubmit)}
                  layout="vertical space-y-4!  "
                >
                  {/* <FormInput label="Hello" /> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormItem
                      label={"Amount"}
                      required={true}
                      name="amount"
                      errors={errors}
                    >
                      <Space.Compact size="large" className="w-full">
                        {/* Amount Input */}
                        <Controller
                          name="amount"
                          control={control}
                          rules={{ required: "Amount is required" }}
                          render={({ field, fieldState }) => (
                            <div className="w-full relative">
                              <Input
                                {...field}
                                placeholder="Amount"
                                type="number"
                              />
                            </div>
                          )}
                        />
                        {/* Currency Select */}
                        <Controller
                          name="currency"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={[
                                { label: "USD", value: "USD" },
                                { label: "BDT", value: "BDT" },
                              ]}
                              className="w-28!"
                            />
                          )}
                        />
                      </Space.Compact>
                    </FormItem>
                    {/* <FormInput
                    size="large"
                    label={
                      <span>
                        Payment Gateway <span class="text-red-500">*</span>
                      </span>
                    }
                  /> */}
                    <FormItem
                      required={true}
                      name={"payment_gateway"}
                      label={"Payment Gateway"}
                      errors={errors}
                    >
                      <Controller
                        name="payment_gateway"
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <Select
                              {...field}
                              size="large"
                              options={[
                                { label: "Paypal USD", value: "paypal_usd" },
                                { label: "Paypal GBP", value: "paypal_gbp" },
                              ]}
                            />
                          </>
                        )}
                      />
                    </FormItem>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <p className="p-2 px-4 text-xs lg:text-base  rounded-2xl bg-primary-50 dark:bg-primary-500! dark:text-primary-50! font-medium text-primary-600">
                      Limit: 1.00 USD - 5000.00 USD
                    </p>
                    <p className="p-2 px-4 text-xs lg:text-base rounded-2xl bg-primary-50 font-medium text-primary-600 dark:bg-primary-500! dark:text-primary-50!">
                      Charge: 0.00 USD + 2.00%
                    </p>
                  </div>
                  <PrimaryButton type="submit" className={"text-base w-full"}>
                    Confirm{" "}
                  </PrimaryButton>
                </Form>
              </div>
            </Card>
          </div>
          <div className="col-span-1 md:col-span-2">
            <Card title="Summery">
              {/* <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Summery
              </h2> */}
              <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm  border-gray-200 dark:border-gray-800">
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {singleTable?.map((row, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 text-sm"
                    >
                      <span className="text-gray-600 font-medium dark:text-gray-400">
                        {row.label}
                      </span>

                      <span
                        className={`text-gray-900 dark:text-gray-100  ${
                          row.bold ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div>
          <AddMoneyTransaction />
        </div>
      </div>
    </section>
  );
};

export default AddMoney;
