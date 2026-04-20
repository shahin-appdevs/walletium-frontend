"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Card, Input, Select, Space, Button, Upload } from "antd";
import { ArrowUpRight, DollarSign, UploadCloud } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";

import Image from "next/image";
import {
  useAddMoneyAutomaticSubmitMutation,
  useAddMoneyManualSubmitMutation,
  useGetPaymentGatewaysQuery,
  useLazyGetManualPaymentGatewayFieldsQuery,
} from "@/redux/api/addMoneyApi";
import { getImageUrl } from "@/utils/getImageUrl";
import showToast from "@/lib/toast";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import AddMoneyPageSkeleton from "./AddMoneySkeleton/AddMoneyPageSkeleton";
import AddMoneyFieldSkeleton from "./AddMoneySkeleton/AddMoneyFieldSkeleton";
import { isArrayCheck } from "@/utils/IsArrayCheck";
import dynamic from "next/dynamic";
import AddMoneySummery from "./AddMoneySummery";

// dynamic imports
const AddMoneyTransaction = dynamic(
  () => import("./Transaction/AddMoneyTransaction"),
  {
    ssr: false,
    loading: () => (
      <div className="py-8 text-center text-gray-500 animate-pulse">
        Loading recent transactions...
      </div>
    ),
  },
);

// Form Schema
const addMoneySchema = yup.object({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  payment_gateway: yup.number().required("Please select a payment gateway"),
});

const AddMoney = () => {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USD");
  const [selectedGatewayId, setSelectedGatewayId] = useState(null);
  const [manualGatewayInputs, setManualGatewayInputs] = useState(null);

  const router = useRouter();
  const locale = useLocale();

  // RTK Query Hook
  const { data, isLoading, error } = useGetPaymentGatewaysQuery();
  const [addMoneyAutomaticSubmit] = useAddMoneyAutomaticSubmitMutation();
  const [addMoneyManualSubmit] = useAddMoneyManualSubmitMutation();
  const [getManualPaymentGatewayFields, { isLoading: isFieldsLoading }] =
    useLazyGetManualPaymentGatewayFieldsQuery();

  console.log(data);

  const paymentData = data?.data?.payment_gateways || {};
  // Optimized & stable derived values
  const userWallets = useMemo(() => {
    return isArrayCheck(paymentData.user_wallet) ? paymentData.user_wallet : [];
  }, [paymentData.user_wallet]);

  const gateways = useMemo(() => {
    return isArrayCheck(paymentData.gateway_currencies)
      ? paymentData.gateway_currencies
      : [];
  }, [paymentData.gateway_currencies]);

  const allGatewayCurrencies = useMemo(() => {
    return gateways.flatMap((gateway) =>
      gateway.currencies.map((currency) => ({
        ...currency,
        gateway: {
          id: gateway.id,
          name: gateway.name,
          type: gateway.type,
          crypto: gateway.crypto,
          desc: gateway.desc,
          status: gateway.status,
        },
      })),
    );
  }, [gateways]);

  const selectedUserWallet = userWallets.find(
    (w) => w.currency_code === selectedCurrencyCode,
  );

  const selectedGateway = allGatewayCurrencies.find(
    (g) => g.id === selectedGatewayId,
  );
  // exchange rate
  const exchangeRate = useMemo(() => {
    if (!selectedGateway || !selectedUserWallet) return null;
    const walletRate = selectedUserWallet.rate;
    const gatewayRate = selectedGateway.rate;

    return (1 / walletRate) * gatewayRate;
  }, [selectedGateway, selectedUserWallet]);

  // exchange rate format
  const exchangeRateFormat = useMemo(() => {
    if (!exchangeRate) return null;
    return `1 ${selectedCurrencyCode} = ${exchangeRate.toFixed(4)} ${selectedGateway?.currency_code}`;
  }, [exchangeRate, selectedCurrencyCode, selectedGateway?.currency_code]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addMoneySchema),
    defaultValues: {
      amount: undefined,
      payment_gateway: undefined,
    },
  });

  const amount = watch("amount");

  useEffect(() => {
    if (!selectedGatewayId) {
      setSelectedGatewayId(allGatewayCurrencies[0]?.id);
      setValue("payment_gateway", allGatewayCurrencies[0]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGatewayCurrencies]);

  // Live Fee Calculation
  const { totalFee, youWillReceive } = useMemo(() => {
    if (!selectedGateway || !amount) {
      return { totalFee: 0, youWillReceive: 0 };
    }
    const percentFee = (amount * selectedGateway.percent_charge) / 100;
    const fee = percentFee + selectedGateway.fixed_charge;
    return {
      totalFee: Number(fee.toFixed(2)),
      youWillReceive: Number((amount - fee).toFixed(2)),
    };
  }, [amount, selectedGateway]);

  // add money submit
  const onSubmit = async (data) => {
    if (!selectedGateway) return;
    // automatic payment gateway
    if (selectedGateway.gateway?.type === "AUTOMATIC") {
      try {
        const payload = {
          amount: data.amount,
          gateway_currency: selectedGateway.alias,
          request_currency: selectedCurrencyCode,
        };

        const res = await addMoneyAutomaticSubmit({
          payload,
          lang: locale,
        }).unwrap();
        showToast.apiSuccess(res);
        router.push(res?.data?.redirect_url);
      } catch (error) {
        showToast.apiError(error);
      }
    }

    // manual payment gateway
    if (selectedGateway.gateway?.type === "MANUAL") {
      try {
        const formData = new FormData();
        formData.append("amount", data.amount);
        formData.append("currency", selectedGateway.alias);
        formData.append("request_currency", selectedCurrencyCode);

        // Append dynamic fields
        manualGatewayInputs.forEach((input) => {
          if (data[input.name]) {
            formData.append(input.name, data[input.name]);
          }
        });

        const res = await addMoneyManualSubmit({
          payload: formData,
          lang: locale,
        }).unwrap();
        showToast.apiSuccess(res);
        // router.push(res?.data?.redirect_url);
        reset({});
        setSelectedGatewayId(allGatewayCurrencies[0]?.id);
        setManualGatewayInputs(null);
      } catch (error) {
        showToast.apiError(error);
      }
    }
  };

  // manual gateway field
  const onChangeManualGateway = useCallback(
    async (selectedGateway) => {
      if (!selectedGateway) {
        setManualGatewayInputs(null);
        return;
      }

      try {
        if (selectedGateway.gateway?.type === "MANUAL") {
          const res = await getManualPaymentGatewayFields({
            alias: selectedGateway.alias,
            lang: locale,
          }).unwrap();

          setManualGatewayInputs(res?.data?.input_fields || null);
        } else {
          setManualGatewayInputs(null);
        }
      } catch (error) {
        showToast.apiError(error);
        setManualGatewayInputs(null); // Clear on error for better UX
      }
    },
    [getManualPaymentGatewayFields, locale],
  );

  if (isLoading) {
    return <AddMoneyPageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load payment gateways
      </div>
    );
  }

  return (
    <section>
      <div className="space-y-6">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Left Column - Form */}
          <div className="md:col-span-3">
            <Card title="Add Money" className="h-full">
              {/* Exchange Rate & Balance */}
              <div className="bg-neutral-50 dark:bg-slate-900 mb-6 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center border border-primary/30">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center border border-primary/30">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 ">
                    <p className="text-gray-500">Exchange Rate</p>
                    <p className="text-xl font-semibold!">
                      {exchangeRateFormat}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 ">
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <p className="text-xl font-semibold!">
                      {selectedUserWallet?.currency_symbol}{" "}
                      {selectedUserWallet?.balance?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-neutral-50 dark:bg-slate-900 rounded-2xl p-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="md:space-y-6"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-6">
                    {/* Amount + Currency */}
                    <FormItem
                      label="Amount"
                      required
                      errors={errors}
                      layout="vertical"
                    >
                      <Space.Compact className="w-full">
                        <Controller
                          name="amount"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="number"
                              placeholder="0.00"
                              size="large"
                            />
                          )}
                        />
                        <Controller
                          name="currency"
                          control={control}
                          render={() => (
                            <Select
                              value={selectedCurrencyCode}
                              onChange={setSelectedCurrencyCode}
                              size="large"
                              className="w-32"
                              options={userWallets.map((wallet) => ({
                                label: (
                                  <div className="flex items-center gap-2">
                                    {wallet.flag && (
                                      <Image
                                        src={getImageUrl(
                                          wallet?.flag,
                                          wallet?.image_path,
                                        )}
                                        alt={wallet?.name}
                                        width={24}
                                        height={24}
                                        className="rounded-full "
                                      />
                                    )}

                                    {wallet.currency_code}
                                  </div>
                                ),
                                value: wallet.currency_code,
                              }))}
                            />
                          )}
                        />
                      </Space.Compact>
                    </FormItem>

                    {/* Payment Gateway */}
                    <FormItem
                      label="Payment Gateway"
                      required
                      errors={errors}
                      layout="vertical"
                    >
                      <Controller
                        name="payment_gateway"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            size="large"
                            placeholder="Select gateway"
                            onChange={(value) => {
                              field.onChange(value);
                              setSelectedGatewayId(value);

                              const selectedGateway = allGatewayCurrencies.find(
                                (gateway) => gateway.id === value,
                              );

                              onChangeManualGateway(selectedGateway);
                            }}
                            options={allGatewayCurrencies.map((gateway) => ({
                              label: (
                                <div className="flex justify-between items-center">
                                  <span>{gateway.name}</span>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      gateway.gateway.type === "AUTOMATIC"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}
                                  >
                                    {gateway.gateway.type}
                                  </span>
                                </div>
                              ),
                              value: gateway.id,
                            }))}
                          />
                        )}
                      />
                    </FormItem>
                  </div>

                  {/* Limit & Charge */}
                  {selectedGateway && (
                    <div className="flex flex-wrap gap-3">
                      <div className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-2xl">
                        Limit: {selectedGateway.min_limit} —{" "}
                        {selectedGateway.max_limit} {selectedCurrencyCode}
                      </div>
                      <div className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-2xl">
                        Charge: {selectedGateway.fixed_charge} +{" "}
                        {selectedGateway.percent_charge}%
                      </div>
                    </div>
                  )}

                  {isFieldsLoading && <AddMoneyFieldSkeleton />}

                  {/* Dynamic Manual Fields */}
                  {manualGatewayInputs && manualGatewayInputs.length > 0 && (
                    <div className="mt-8 space-y-6  border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        <h3 className="text-lg font-semibold">
                          Payment Instruction
                        </h3>
                      </div>
                      {selectedGateway?.gateway?.desc && (
                        <div
                          className="mt-2 mb-4 p-4  bg-amber-50/50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-600 rounded-2xl border border-amber-200 dark:border-amber-900/30"
                          dangerouslySetInnerHTML={{
                            __html: selectedGateway?.gateway?.desc,
                          }}
                        />
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {manualGatewayInputs.map((input) => (
                          <FormItem
                            key={input.name}
                            label={input.label}
                            name={input.name}
                            required={input.required}
                            errors={errors}
                            layout="vertical"
                          >
                            <Controller
                              name={input.name}
                              control={control}
                              rules={{
                                required: input.required
                                  ? `${input.label} is required`
                                  : false,
                              }}
                              render={({ field }) => {
                                if (input.type === "text") {
                                  return <Input {...field} size="large" />;
                                }
                                if (input.type === "textarea") {
                                  return (
                                    <Input.TextArea
                                      {...field}
                                      rows={4}
                                      size="large"
                                    />
                                  );
                                }
                                if (input.type === "file") {
                                  return (
                                    <Upload
                                      beforeUpload={(file) => {
                                        field.onChange(file);
                                        return false; // Prevent auto upload
                                      }}
                                      maxCount={1}
                                      onRemove={() => field.onChange(undefined)}
                                      className="w-full"
                                    >
                                      <Button
                                        icon={
                                          <UploadCloud className="w-4 h-4" />
                                        }
                                        size="large"
                                        className="w-full text-left flex items-center justify-between"
                                      >
                                        <span className="text-gray-400">
                                          Select {input.label}
                                        </span>
                                      </Button>
                                    </Upload>
                                  );
                                }
                                return null;
                              }}
                            />
                          </FormItem>
                        ))}
                      </div>
                    </div>
                  )}

                  <PrimaryButton
                    type="submit"
                    loading={isSubmitting}
                    disabled={!selectedGatewayId || !amount}
                    className="w-full text-base h-12"
                  >
                    Proceed to Pay
                  </PrimaryButton>
                </form>
              </div>
            </Card>
          </div>

          {/* Summary Column */}
          <div className="md:col-span-2">
            <AddMoneySummery
              amount={amount}
              selectedCurrencyCode={selectedCurrencyCode}
              totalFee={totalFee}
              youWillReceive={youWillReceive}
              selectedGateway={selectedGateway}
            />
          </div>
        </div>

        <AddMoneyTransaction />
      </div>
    </section>
  );
};

export default AddMoney;
