"use client";

import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, Input, Select, Space } from "antd";
import { ArrowUpRight, DollarSign } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";
import dynamic from "next/dynamic";

const MoneyExchangeLog = dynamic(
  () => import("./MoneyExchangeLog/MoneyExchangeLog"),
  { ssr: false, loading: () => null },
);

import {
  useGetExchangeMoneyIndexQuery,
  useExchangeMoneySubmitMutation,
} from "@/redux/api/exchangeMoneyApi";
import { isArrayCheck } from "@/utils/IsArrayCheck";
import { getImageUrl } from "@/utils/getImageUrl";
import { getExchangeRate } from "@/utils/exchangeRate";
import useGatewayLimits from "@/hooks/useGatewayLimits";
import showToast from "@/lib/toast";
import { useLocale, useTranslations } from "next-intl";

import { useGetTransactionsQuery } from "@/redux/api/dashboardApi";
import SendMoneyPageSkeleton from "../../send-money/_components/SendMoneySkeleton/SendMoneyPageSkeleton";

const exchangeMoneySchema = (t) =>
  yup.object({
    exchange_from_amount: yup
      .string()
      .required(t("validation.fromAmountRequired")),
    exchange_to_amount: yup.string().required(t("validation.toAmountRequired")),
  });

const ExchangeMoney = () => {
  const locale = useLocale();
  const t = useTranslations("Dashboard.exchangeMoney");

  const {
    data: exchangeMoneyIndexData,
    isLoading,
    error,
  } = useGetExchangeMoneyIndexQuery({
    lang: locale,
  });

  const { data: transactionsData, isLoading: isTransactionsLoading } =
    useGetTransactionsQuery({
      type: "money-exchange",
      page: 1,
      per_page: 5,
      lang: locale,
    });

  const [exchangeMoneySubmit, { isLoading: isSubmitting }] =
    useExchangeMoneySubmitMutation();

  const exchangeMoneyData = exchangeMoneyIndexData?.data || {};
  const userWallets = useMemo(
    () =>
      isArrayCheck(exchangeMoneyData.userWallet)
        ? exchangeMoneyData.userWallet
        : [],
    [exchangeMoneyData.userWallet],
  );
  const charges = exchangeMoneyData.charges || {};

  const [selectedFromCurrency, setSelectedFromCurrency] = useState("");
  const [selectedToCurrency, setSelectedToCurrency] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(exchangeMoneySchema(t)),
    defaultValues: {
      exchange_from_amount: "",
      exchange_to_amount: "",
    },
  });

  const exchangeFromAmount = watch("exchange_from_amount");

  useEffect(() => {
    if (userWallets.length > 0) {
      if (!selectedFromCurrency) {
        setSelectedFromCurrency(userWallets[0].currency_code);
      }
      if (!selectedToCurrency && userWallets.length > 1) {
        setSelectedToCurrency(userWallets[1].currency_code);
      } else if (!selectedToCurrency) {
        setSelectedToCurrency(userWallets[0].currency_code);
      }
    }
  }, [userWallets, selectedFromCurrency, selectedToCurrency]);

  const selectedFromWallet = useMemo(
    () => userWallets.find((w) => w.currency_code === selectedFromCurrency),
    [userWallets, selectedFromCurrency],
  );
  const selectedToWallet = useMemo(
    () => userWallets.find((w) => w.currency_code === selectedToCurrency),
    [userWallets, selectedToCurrency],
  );

  const exchangeRate = getExchangeRate(
    selectedFromWallet?.rate,
    selectedToWallet?.rate,
  );

  const { totalFee, totalPayable, recipientAmount } = useMemo(() => {
    if (
      !selectedFromWallet ||
      !exchangeFromAmount ||
      isNaN(exchangeFromAmount)
    ) {
      return { totalFee: 0, totalPayable: 0, recipientAmount: 0 };
    }

    const amount = parseFloat(exchangeFromAmount);
    // Convert fixed charge to sender's currency
    const fixedChargeInSenderCurrency =
      (charges.fixed_charge / charges.rate) * selectedFromWallet.rate;
    const percentFee = (amount * charges.percent_charge) / 100;
    const fee = fixedChargeInSenderCurrency + percentFee;

    return {
      totalFee: Number(fee.toFixed(2)),
      totalPayable: Number((amount + fee).toFixed(2)),
      recipientAmount: Number((amount * exchangeRate).toFixed(2)),
    };
  }, [exchangeFromAmount, selectedFromWallet, charges, exchangeRate]);

  // Pass charge rate / sender rate to useGatewayLimits so min/max are in sender currency
  const limitRate =
    charges.rate && selectedFromWallet?.rate
      ? charges.rate / selectedFromWallet.rate
      : 1;
  const { minLimit, maxLimit } = useGatewayLimits(charges, limitRate);
  //fixed charge calculation
  const fixedCharge = (
    charges.fixed_charge *
      getExchangeRate(charges.rate, selectedFromWallet?.rate) || 0
  ).toFixed(2);

  useEffect(() => {
    if (recipientAmount) {
      setValue("exchange_to_amount", recipientAmount.toString());
    } else {
      setValue("exchange_to_amount", "");
    }
  }, [recipientAmount, setValue]);

  const handleFromAmountChange = (e) => {
    const val = e.target.value;
    setValue("exchange_from_amount", val);
  };

  const handleToAmountChange = (e) => {
    const val = e.target.value;
    setValue("exchange_to_amount", val);
    if (!isNaN(val) && val !== "" && exchangeRate > 0) {
      const sAmt = parseFloat(val) / exchangeRate;
      setValue("exchange_from_amount", sAmt.toFixed(2));
    } else {
      setValue("exchange_from_amount", "");
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        exchange_from_amount: data.exchange_from_amount,
        exchange_from_currency: selectedFromCurrency,
        exchange_to_currency: selectedToCurrency,
      };

      const res = await exchangeMoneySubmit({
        payload,
        lang: locale,
      }).unwrap();

      showToast.apiSuccess(res);
      reset({ exchange_from_amount: "", exchange_to_amount: "" });
    } catch (error) {
      showToast.apiError(error);
    }
  };

  if (isLoading) return <SendMoneyPageSkeleton />;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">{t("errorLoading")}</div>
    );

  const singleTable = [
    {
      label: t("summary.exchangeFromWallet"),
      value: (
        <span dir="ltr" className="font-medium text-sm xl:text-base">
          {`${selectedFromWallet?.name || "N/A"} (${selectedFromCurrency})`}
        </span>
      ),
    },
    {
      label: t("summary.exchangeToWallet"),
      value: (
        <span dir="ltr" className="font-medium text-sm xl:text-base">
          {`${selectedToWallet?.name || "N/A"} (${selectedToCurrency})`}
        </span>
      ),
    },
    {
      label: t("summary.exchangeAmount"),
      value: (
        <span dir="ltr" className="font-medium text-sm xl:text-base">
          {exchangeFromAmount || 0} {selectedFromCurrency}
        </span>
      ),
    },
    {
      label: t("summary.totalFees"),
      value: (
        <span dir="ltr" className="font-medium text-sm xl:text-base">
          {totalFee} {selectedFromCurrency}
        </span>
      ),
    },
    {
      label: t("summary.exchangeRate"),
      value: (
        <span dir="ltr" className="font-medium text-sm xl:text-base">
          1 {selectedFromCurrency} = {exchangeRate.toFixed(4)}{" "}
          {selectedToCurrency}
        </span>
      ),
    },
    {
      label: t("summary.convertedAmount"),
      value: (
        <span dir="ltr" className="font-medium text-sm xl:text-base">
          {recipientAmount} {selectedToCurrency}
        </span>
      ),
    },
    {
      label: (
        <span className="font-bold text-sm xl:text-lg">
          {t("summary.totalPayable")}
        </span>
      ),
      value: (
        <span dir="ltr" className="font-bold text-sm xl:text-lg">
          {totalPayable} {selectedFromCurrency}
        </span>
      ),
    },
  ];

  return (
    <section>
      <div className="space-y-4 lg:space-y-6">
        <div className="grid md:grid-cols-12 gap-4 xl:gap-6">
          <div className="col-span-12 md:col-span-12 xl:col-span-7 ">
            <Card title={t("title")} className="h-full!">
              <div className="mb-4 bg-neutral-50 dark:bg-slate-950 rounded-2xl shadow-xs p-4 flex flex-col gap-3 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-50! dark:bg-primary-500! border border-primary/50">
                    <DollarSign className="w-4 h-4 text-primary dark:text-primary-50! " />
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-50! dark:bg-primary-500! border border-primary/50">
                    <ArrowUpRight className="w-4 h-4 text-primary dark:text-primary-50! " />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("exchangeRate")}
                    </p>
                    <p
                      dir="ltr"
                      className="text-base! lg:text-lg! text-neutral-800 dark:text-neutral-300 font-semibold! rtl:text-right"
                    >
                      1 {selectedFromCurrency} = {exchangeRate.toFixed(4)}{" "}
                      {selectedToCurrency}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("availableBalance")}
                    </p>
                    <p
                      dir="ltr"
                      className="text-base! lg:text-lg! text-neutral-800 dark:text-neutral-300 font-semibold! rtl:text-right"
                    >
                      {selectedFromWallet?.currency_symbol}{" "}
                      {Number(selectedFromWallet?.balance || 0).toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl shadow-xs p-4 bg-neutral-50 dark:bg-slate-950">
                <Form
                  onFinish={handleSubmit(onSubmit)}
                  layout="vertical space-y-4!"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormItem
                      label={t("exchangeFrom")}
                      required={true}
                      name="exchange_from_amount"
                      errors={errors}
                    >
                      <Space.Compact size="large" className="w-full">
                        <Controller
                          name="exchange_from_amount"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder={t("amountPlaceholder")}
                              type="number"
                              size="large"
                              onChange={handleFromAmountChange}
                            />
                          )}
                        />
                        <Select
                          value={selectedFromCurrency}
                          onChange={setSelectedFromCurrency}
                          size="large"
                          className="w-36!"
                          options={userWallets.map((w) => ({
                            label: (
                              <div className="flex items-center gap-2">
                                <Image
                                  src={getImageUrl(w.flag, w.image_path)}
                                  alt={w.currency_code}
                                  width={20}
                                  height={20}
                                  className="rounded-full"
                                />
                                {w.currency_code}
                              </div>
                            ),
                            value: w.currency_code,
                          }))}
                        />
                      </Space.Compact>
                    </FormItem>

                    <FormItem
                      label={t("exchangeTo")}
                      name={"exchange_to_amount"}
                      required={true}
                      errors={errors}
                    >
                      <Space.Compact size="large" className="w-full">
                        <Controller
                          name="exchange_to_amount"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="0.00"
                              type="number"
                              readOnly={true}
                              onChange={handleToAmountChange}
                            />
                          )}
                        />
                        <Select
                          value={selectedToCurrency}
                          onChange={setSelectedToCurrency}
                          options={userWallets.map((w) => ({
                            label: (
                              <div className="flex items-center gap-2">
                                <Image
                                  src={getImageUrl(w.flag, w.image_path)}
                                  alt={w.currency_code}
                                  width={20}
                                  height={20}
                                  className="rounded-full"
                                />
                                {w.currency_code}
                              </div>
                            ),
                            value: w.currency_code,
                          }))}
                          className="w-36!"
                        />
                      </Space.Compact>
                    </FormItem>
                  </div>

                  <div className="flex flex-col md:flex-row rtl:md:flex-row-reverse gap-2 justify-between items-center text-left rtl:text-right">
                    <p className="p-2 px-4 text-xs lg:text-base rounded-2xl bg-primary-50 dark:bg-primary-500! dark:text-primary-50! font-medium text-primary-600">
                      {t("limit")}{" "}
                      <span dir="ltr">
                        {minLimit} {selectedFromCurrency} - {maxLimit}{" "}
                        {selectedFromCurrency}
                      </span>
                    </p>

                    <p className="p-2 px-4 text-xs lg:text-base rounded-2xl bg-primary-50 font-medium text-primary-600 dark:bg-primary-500! dark:text-primary-50!">
                      {t("charge")}{" "}
                      <span dir="ltr">
                        {fixedCharge} {selectedFromCurrency} +{" "}
                        {charges?.percent_charge}%
                      </span>
                    </p>
                  </div>

                  <PrimaryButton
                    icon="ArrowUpRight"
                    type="submit"
                    loading={isSubmitting}
                    className={"text-base w-full"}
                    iconClassName={
                      "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1"
                    }
                  >
                    {t("button")}
                  </PrimaryButton>
                </Form>
              </div>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-12 xl:col-span-5">
            <Card title={t("summary.title")} className="h-full!">
              <div className="w-full p-4 rounded-xl bg-neutral-50 dark:bg-slate-950 shadow-xs">
                <div className="space-y-4">
                  {singleTable?.map((row, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm last:border-t border-gray-300 dark:border-gray-800 last:py-3"
                    >
                      <span className="text-gray-600  dark:text-gray-400">
                        {row.label}
                      </span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
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
          <MoneyExchangeLog
            transactionsData={transactionsData?.data}
            isLoading={isTransactionsLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default ExchangeMoney;
