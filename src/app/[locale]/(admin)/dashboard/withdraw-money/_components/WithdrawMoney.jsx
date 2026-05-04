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
  useGetWithdrawMoneyInformationQuery,
  useWithdrawMoneySubmitMutation,
  useWithdrawMoneyManualConfirmMutation,
} from "@/redux/api/withdrawMoneyApi";
import { getImageUrl } from "@/utils/getImageUrl";
import showToast from "@/lib/toast";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import AddMoneyPageSkeleton from "../../add-money/_components/AddMoneySkeleton/AddMoneyPageSkeleton";
import AddMoneyFieldSkeleton from "../../add-money/_components/AddMoneySkeleton/AddMoneyFieldSkeleton";
import { isArrayCheck } from "@/utils/IsArrayCheck";
import WithdrawSummery from "./WithdrawSummery";
import WithdrawTransaction from "./Transaction/WithdrawTransaction";
import useGatewayLimits from "@/hooks/useGatewayLimits";
import { getExchangeRate, formatExchangeRate } from "@/utils/exchangeRate";
import { useGetTransactionsQuery } from "@/redux/api/dashboardApi";

const WithdrawMoney = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Dashboard.withdrawMoney");
  const tc = useTranslations("common");

  const withdrawMoneySchema = useMemo(() => {
    return yup.object({
      amount: yup
        .number()
        .typeError(t("validation.amountNumber"))
        .positive(t("validation.amountPositive"))
        .required(t("validation.amountRequired")),
      payment_gateway: yup.number().required(t("validation.gatewayRequired")),
    });
  }, [t]);

  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USD");
  const [selectedGatewayId, setSelectedGatewayId] = useState(null);
  const [manualGatewayInputs, setManualGatewayInputs] = useState(null);
  const [manualSubmitInfo, setManualSubmitInfo] = useState(null);

  // RTK Query Hook
  const { data, isLoading, error } =
    useGetWithdrawMoneyInformationQuery(locale);
  const [withdrawMoneySubmit, { isLoading: isSubmitting }] =
    useWithdrawMoneySubmitMutation();

  const [withdrawMoneyManualConfirm] = useWithdrawMoneyManualConfirmMutation();
  const { data: transactionsData, isLoading: isTransactionsLoading } =
    useGetTransactionsQuery({
      type: "withdraw",
      page: 1,
      per_page: 5,
    });

  const withdrawData = data?.data || {};
  const userWallets = useMemo(() => {
    return isArrayCheck(withdrawData.user_wallet)
      ? withdrawData.user_wallet
      : [];
  }, [withdrawData.user_wallet]);

  const gateways = useMemo(() => {
    return isArrayCheck(withdrawData.gateway_currencies)
      ? withdrawData.gateway_currencies
      : [];
  }, [withdrawData.gateway_currencies]);

  const selectedUserWallet = userWallets.find(
    (w) => w.currency_code === selectedCurrencyCode,
  );

  const selectedGateway = gateways.find((g) => g.id === selectedGatewayId);

  // exchange rate calculation
  const exchangeRate = getExchangeRate(
    selectedUserWallet?.rate,
    selectedGateway?.rate,
  );

  // exchange rate format
  const exchangeRateFormat = formatExchangeRate(
    exchangeRate,
    selectedCurrencyCode,
    selectedGateway?.currency_code,
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm({
    resolver: yupResolver(withdrawMoneySchema),
    defaultValues: {
      amount: undefined,
      payment_gateway: undefined,
    },
  });

  const amount = parseFloat(watch("amount")) || 0;

  //min max limit calculation hook
  const { minLimit, maxLimit } = useGatewayLimits(
    selectedGateway,
    exchangeRate,
  );

  useEffect(() => {
    if (!selectedGatewayId && gateways.length > 0) {
      setSelectedGatewayId(gateways[0]?.id);
      setValue("payment_gateway", gateways[0]?.id);
      // Initialize manual fields if the first gateway is manual
      if (gateways[0]?.type === "MANUAL") {
        onChangeManualGateway(gateways[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gateways]);

  // Live Fee Calculation
  const { totalFee, youWillGet, totalPayable, conversionAmount } =
    useMemo(() => {
      if (!selectedGateway || !amount) {
        return { totalFee: 0, youWillGet: 0, totalPayable: 0 };
      }
      const conversionAmount = amount * exchangeRate;
      const percentFee =
        (conversionAmount * selectedGateway.percent_charge) / 100;
      const fee = percentFee + selectedGateway.fixed_charge;

      return {
        totalFee: Number(fee.toFixed(2)),
        youWillGet: Number((conversionAmount - fee)?.toFixed(2)),
        totalPayable: Number(amount?.toFixed(2)),
        conversionAmount: Number(conversionAmount?.toFixed(2)),
      };
    }, [amount, selectedGateway, exchangeRate]);

  // console.log("amount", amount);

  // withdraw money submit
  const onSubmit = async (data) => {
    if (!selectedGateway) return;

    try {
      const payload = {
        amount: data.amount,
        gateway_currency: selectedGateway.alias,
        sender_currency: selectedCurrencyCode,
      };

      const res = await withdrawMoneySubmit({
        payload,
        lang: locale,
      }).unwrap();

      if (res?.data?.input_fields) {
        setManualGatewayInputs(res.data.input_fields);
        setManualSubmitInfo(res.data);
      }

      showToast.apiSuccess(res);

      if (selectedGateway.type === "AUTOMATIC") {
        if (res?.data?.redirect_url) {
          router.push(res?.data?.redirect_url);
        }
      }
    } catch (error) {
      showToast.apiError(error);
    }
  };

  const onManualConfirm = async (data) => {
    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("trx", manualSubmitInfo?.payment_informations?.trx);
      formData.append("sender_currency", selectedCurrencyCode);

      manualGatewayInputs.forEach((input) => {
        if (data[input.name]) {
          formData.append(input.name, data[input.name]);
        }
      });

      const res = await withdrawMoneyManualConfirm({
        payload: formData,
        lang: locale,
      }).unwrap();
      showToast.apiSuccess(res);
      setValue("amount", "");
      setManualGatewayInputs(null);
      setManualSubmitInfo(null);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  const onChangeManualGateway = useCallback(async (selectedGateway) => {
    if (!selectedGateway) {
      setManualGatewayInputs(null);
      return;
    }

    try {
    } catch (error) {
      showToast.apiError(error);
    }
  }, []);

  if (isLoading) {
    return <AddMoneyPageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {t("errorLoadingGateways")}
      </div>
    );
  }

  return (
    <section>
      <div className="space-y-6">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Left Column - Form */}
          <div className="md:col-span-3">
            <Card title={t("title")} className="h-full">
              <div className="bg-neutral-50 dark:bg-slate-900 mb-6 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center border border-primary/30">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center border border-primary/30 rtl:-rotate-90">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 ">
                    <p className="text-gray-500">{t("exchangeRate")}</p>
                    <p
                      className="text-xl font-semibold! rtl:text-right"
                      dir="ltr"
                    >
                      {exchangeRateFormat}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 ">
                    <p className="text-sm text-gray-500">
                      {t("availableBalance")}
                    </p>
                    <p
                      className="text-xl font-semibold! rtl:text-right"
                      dir="ltr"
                    >
                      {selectedUserWallet?.currency_symbol}{" "}
                      {selectedUserWallet?.balance?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              </div>

              {/* {console.log("selectedGateway", selectedGateway)} */}

              {/* Form */}
              <div className="bg-neutral-50 dark:bg-slate-900 rounded-2xl p-6">
                <form
                  onSubmit={handleSubmit(
                    manualGatewayInputs ? onManualConfirm : onSubmit,
                  )}
                  className="md:space-y-6"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-6">
                    {/* Amount + Currency */}
                    <FormItem
                      label={t("amount")}
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
                      label={t("paymentGateway")}
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
                            placeholder={t("selectGateway")}
                            onChange={(value) => {
                              field.onChange(value);
                              setSelectedGatewayId(value);

                              const g = gateways.find(
                                (gateway) => gateway.id === value,
                              );
                              onChangeManualGateway(g);
                            }}
                            options={gateways.map((gateway) => ({
                              label: (
                                <div className="flex justify-between items-center">
                                  <span>{gateway.name}</span>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      gateway.type === "AUTOMATIC"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}
                                  >
                                    {gateway.type}
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
                    <div className="flex flex-wrap justify-between gap-3">
                      <div className="px-4 py-2 text-sm font-medium bg-primary-50 dark:bg-blue-950 text-primary-600 dark:text-primary-400 rounded-lg">
                        {t("limit")}:{" "}
                        <span dir="ltr">
                          {minLimit} {selectedCurrencyCode} - {maxLimit}{" "}
                          {selectedCurrencyCode}{" "}
                        </span>
                      </div>
                      <div className="px-4 py-2 text-sm font-medium bg-primary-50 dark:bg-blue-950 text-primary-600 dark:text-primary-400 rounded-lg">
                        {t("charge")}:{" "}
                        <span dir="ltr">
                          {Number(selectedGateway?.fixed_charge || 0).toFixed(
                            2,
                          )}{" "}
                          {selectedGateway?.currency_code} +{" "}
                          {selectedGateway?.percent_charge}%
                        </span>
                      </div>
                    </div>
                  )}

                  {isSubmitting && <AddMoneyFieldSkeleton />}

                  {/* Dynamic Manual Fields */}
                  {manualGatewayInputs && manualGatewayInputs.length > 0 && (
                    <div className="mt-8 space-y-6  border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        <h3 className="text-lg font-semibold">
                          {t("paymentInstruction")}
                        </h3>
                      </div>

                      {manualSubmitInfo?.details && (
                        <div
                          className="mt-2 mb-4 p-4  bg-amber-50/50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-600 rounded-2xl border border-amber-200 dark:border-amber-900/30"
                          dangerouslySetInnerHTML={{
                            __html: manualSubmitInfo?.details,
                          }}
                        />
                      )}

                      <div className="grid grid-cols-1">
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
                                  ? t("validation.fieldRequired", {
                                      label: input.label,
                                    })
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
                                        return false;
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
                                          {t("selectFile")}
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
                    loading={isFormSubmitting}
                    disabled={!selectedGatewayId || !amount}
                    className="w-full text-base h-12"
                  >
                    {manualSubmitInfo
                      ? tc("action.confirm")
                      : t("proceedToWithdraw")}
                  </PrimaryButton>
                </form>
              </div>
            </Card>
          </div>

          {/* Summary Column */}
          <div className="md:col-span-2">
            <WithdrawSummery
              amount={amount}
              selectedGateway={selectedGateway}
              selectedCurrencyCode={selectedCurrencyCode}
              totalFee={totalFee}
              youWillGet={youWillGet}
              totalPayable={totalPayable}
              manualSubmitInfo={manualSubmitInfo?.payment_informations}
              conversionAmount={conversionAmount}
            />
          </div>
        </div>

        <WithdrawTransaction
          transactionsData={transactionsData?.data?.transactions?.data}
          isLoading={isTransactionsLoading}
        />
      </div>
    </section>
  );
};

export default WithdrawMoney;
