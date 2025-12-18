"use client";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import useModal from "@/hooks/useModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, Input, Modal, Select, Space } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { cssTransition, Flip, Slide, toast } from "react-toastify";
import * as yup from "yup";
import CreateRedeemCode from "./_components/CreateRedeemCode";
import MyVoucherTransaction from "./_components/Transaction/MyVoucherTransaction";
// import RequestMoneyTransaction from "./_components/Transaction/RequestMoneyTransaction";

const requestMoneySchema = yup.object({
  amount: yup.string().required("Request amount is required"),
  redeem_code: yup.string().required("Redeem Code is required"),
});

const RequestMoney = () => {
  const { isModalOpen, handleCancelModal, handleOkModal, handleShowModal } =
    useModal();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(requestMoneySchema),
    defaultValues: {
      request_currency: "USD",
      amount: "",
      redeem_code: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const singleTable = [
    { label: "Entered Amount", value: "$50" },

    { label: "Total Fees & Charges", value: "$100" },
    { label: "Will Gate", value: "$100" },
    { label: "Receiver Will Get", value: "$100" },
    {
      label: <span className="font-bold text-lg">Total Payable Amount</span>,
      value: <span className="font-bold text-lg">$200</span>,
    },
  ];

  const CreateRedeemCodeProps = {
    isModalOpen,
    handleCancelModal,
    handleOkModal,
  };

  return (
    <section>
      <div className="space-y-4 lg:space-y-6">
        <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
          <div className="col-span-1 md:col-span-3 ">
            <Card title="My Voucher" className="h-full!">
              <CreateRedeemCode {...CreateRedeemCodeProps} />
              {/* form start */}
              <div className="rounded-2xl shadow-sm p-4 ">
                <Form
                  onFinish={handleSubmit(onSubmit)}
                  layout="vertical space-y-4!  "
                >
                  {/* <FormInput label="Hello" /> */}
                  <div>
                    {/* <Form.Item
                      required={true}
                      label={<span>Request Amount</span>}
                    >
                      
                    </Form.Item> */}
                    <FormItem
                      required={true}
                      label={"Amount"}
                      name={"amount"}
                      errors={errors}
                    >
                      <div className="flex gap-2 items-center">
                        <Space.Compact size="large" className="w-full ">
                          {/* Currency Select */}

                          {/* Amount Input */}
                          <Controller
                            name="amount"
                            control={control}
                            render={({ field, fieldState }) => (
                              <div className="w-full relative">
                                <Input
                                  {...field}
                                  placeholder="Enter Amount"
                                  type="number"
                                />
                              </div>
                            )}
                          />
                          <Controller
                            name="request_currency"
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
                        <PrimaryButton
                          onClick={handleShowModal}
                          className={"text-base shrink-0"}
                          iconClassName={
                            "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
                          }
                        >
                          Create{" "}
                        </PrimaryButton>
                      </div>
                    </FormItem>
                    <FormItem
                      label="Redeem Code"
                      required={true}
                      name="redeem_code"
                      errors={errors}
                    >
                      {/* Currency Select */}

                      {/* Request Process Input */}
                      <Controller
                        name="redeem_code"
                        control={control}
                        render={({ field, fieldState }) => (
                          <div className="w-full relative">
                            <Input
                              {...field}
                              placeholder="Explain Request Process Here"
                              type="text"
                              size="large"
                            />
                          </div>
                        )}
                      />
                    </FormItem>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <p className="p-2 text-xs lg:text-base px-4 rounded-2xl bg-primary-50 dark:bg-primary-500! dark:text-primary-50! font-medium text-primary-600">
                      Limit: 1.00 USD - 5000.00 USD
                    </p>
                    <p className="p-2 px-4 text-xs lg:text-base rounded-2xl bg-primary-50  font-medium text-primary-600 dark:bg-primary-500! dark:text-primary-50!">
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
                    Confirm Redeem
                  </PrimaryButton>
                </Form>
              </div>
            </Card>
          </div>
          <div className="col-span-1 md:col-span-2">
            <Card title="Summery" className="h-full!">
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
          <MyVoucherTransaction />
        </div>
      </div>
    </section>
  );
};

export default RequestMoney;
