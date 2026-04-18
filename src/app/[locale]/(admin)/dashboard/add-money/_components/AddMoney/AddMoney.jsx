"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, Input, Select, Space, Alert } from "antd";
import { ArrowUpRight, DollarSign, AlertCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import AddMoneyTransaction from "../Transaction/AddMoneyTransaction";

import Image from "next/image";
import {
  useAddMoneyAutomaticSubmitMutation,
  useAddMoneyManualMutation,
  useGetPaymentGatewaysQuery,
} from "@/redux/api/addMoneyApi";
import { getImageUrl } from "@/utils/getImageUrl";
import showToast from "@/lib/toast";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const locale = useLocale();

  // RTK Query Hook
  const { data, isLoading, error } = useGetPaymentGatewaysQuery();
  const [addMoneyAutomatic, { isLoading: isAddMoneyAutomaticLoading }] =
    useAddMoneyAutomaticSubmitMutation();
  const [addMoneyManual, { isLoading: isAddMoneyManualLoading }] =
    useAddMoneyManualMutation();

  const paymentData = data?.data?.payment_gateways || {};
  const userWallets = paymentData.user_wallet || [];
  const gateways = paymentData.gateway_currencies || [];

  const allGatewayCurrencies = gateways.flatMap((gateway) =>
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

  const onSubmit = async (data) => {
    // automatic payment gateway
    if (selectedGateway.gateway?.type === "AUTOMATIC") {
      try {
        const payload = {
          amount: data.amount,
          gateway_currency: selectedGateway.alias,
          request_currency: selectedCurrencyCode,
        };

        const res = await addMoneyAutomatic({
          payload,
          lang: locale,
        }).unwrap();
        showToast.apiSuccess(res);
        router.push(res?.data?.redirect_url);
      } catch (error) {
        showToast.apiError(error);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading payment options...</div>;
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
            <Card title="Summary" className="h-full">
              <div className="bg-neutral-50 dark:bg-slate-900 rounded-2xl p-6">
                <div className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600 dark:text-gray-400">
                      Entered Amount
                    </span>
                    <span>
                      {amount || 0} {selectedCurrencyCode}
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Fees & Charges
                    </span>
                    <span className="text-red-600">
                      {totalFee} {selectedCurrencyCode}
                    </span>
                  </div>
                  <div className="flex justify-between py-4 font-semibold text-base border-t">
                    <span>You will receive</span>
                    <span>
                      {youWillReceive} {selectedCurrencyCode}
                    </span>
                  </div>
                </div>

                {selectedGateway?.type === "MANUAL" && (
                  <Alert
                    message="Manual Payment"
                    description="Upload payment proof after making the transfer."
                    type="warning"
                    showIcon
                    icon={<AlertCircle className="w-4 h-4" />}
                    className="mt-6"
                  />
                )}
              </div>
            </Card>
          </div>
        </div>

        <AddMoneyTransaction />
      </div>
    </section>
  );
};

export default AddMoney;
