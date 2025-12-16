"use client";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, Input, Select, Space } from "antd";
import { ArrowUpRight, DollarSign } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
// import SendMoneyTransaction from "./_components/Transaction/SendMoneyTransaction";

import * as yup from "yup";
import MoneyExchangeLog from "./_components/MoneyExchangeLog/MoneyExchangeLog";

const exchangeMoneySchema = yup.object({
  exchange_from: yup.string().required("Exchange form is required"),
  exchange_to: yup.string().required("Exchange to is required"),
});

const ExchangeMoney = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(exchangeMoneySchema),
    defaultValues: {
      currency_from: "USD",
      currency_to: "USD",
      amount: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const singleTable = [
    { label: "Sender Wallet", value: "$50" },
    { label: "Receiver Wallet", value: "$50" },
    { label: "Sending Amount", value: "$50" },
    { label: "Total Fees & Charges", value: "$100" },
    { label: "Exchange Rate", value: "$100" },
    { label: "Receiver Will Get", value: "$100" },

    {
      label: <span className="font-bold text-lg">Total Payable Amount</span>,
      value: <span className="font-bold text-lg">$ 200</span>,
    },
  ];

  return (
    <section>
      <div className="space-y-4 lg:space-y-6">
        <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
          <div className="col-span-1 md:col-span-3 ">
            <Card title="Send Money" className=" space-y-4!">
              {/* <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Send Money
              </h2> */}

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
                    <p className="text-xl text-neutral-800 dark:text-neutral-300 font-semibold">
                      1 USD = 1.000 USDT
                    </p>
                  </div>
                  <div className="border-primary/50 border rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">Available balance:</p>
                    <p className="text-xl text-neutral-800 dark:text-neutral-300 font-semibold">
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
                      label={"Exchange From"}
                      required={true}
                      name={"exchange_from"}
                      errors={errors}
                    >
                      <Space.Compact size="large" className="w-full">
                        {/* Currency Select */}

                        {/* Amount Input */}
                        <Controller
                          name="exchange_from"
                          control={control}
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
                        <Controller
                          name="currency_from"
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
                    <FormItem
                      name={"exchange_to"}
                      label="Exchange To"
                      required={true}
                      errors={errors}
                    >
                      <Space.Compact size="large" className="w-full">
                        {/* Amount Input */}
                        <Controller
                          name="exchange_to"
                          control={control}
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
                        <Controller
                          name="currency_to"
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
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2 justify-between items-center">
                    <p className="p-2 px-4 rounded-2xl bg-primary-50 dark:bg-primary-500! dark:text-primary-50! font-medium text-primary-600">
                      Limit: 1.00 USD - 5000.00 USD
                    </p>
                    <p className="p-2 px-4 rounded-2xl bg-primary-50 font-medium text-primary-600 dark:bg-primary-500! dark:text-primary-50!">
                      Charge: 0.00 USD + 2.00%
                    </p>
                  </div>
                  <PrimaryButton
                    icon="ArrowUpRight"
                    type="submit"
                    className={"text-base w-full"}
                    iconClassName={
                      "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
                    }
                  >
                    Exchange Money{" "}
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
          <MoneyExchangeLog />
        </div>
      </div>
    </section>
  );
};

export default ExchangeMoney;
