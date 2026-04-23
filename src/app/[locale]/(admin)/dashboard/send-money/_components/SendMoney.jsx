"use client";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { Card, Form, Input, Select, Space } from "antd";
import { ArrowUpRight, DollarSign } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "@/components/ui/form/FormItem";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import {
  useGetSendMoneyIndexQuery,
  useSendMoneySubmitMutation,
  useSendMoneyConfirmMutation,
} from "@/redux/api/sendMoneyApi";
import SendMoneyPageSkeleton from "./SendMoneySkeleton/SendMoneyPageSkeleton";
import { useEffect, useMemo, useState } from "react";
import { isArrayCheck } from "@/utils/IsArrayCheck";
import Image from "next/image";

import { getImageUrl } from "@/utils/getImageUrl";
import { getExchangeRate } from "@/utils/exchangeRate";
import useGatewayLimits from "@/hooks/useGatewayLimits";
import showToast from "@/lib/toast";
import RecipientsModal from "./RecipientsModal";
import { useGetTransactionsQuery } from "@/redux/api/dashboardApi";

const sendMoneySchema = yup.object({
  sender_amount: yup.string().required("Sender amount is required"),
  recipient_amount: yup.string().required("Recipient amount is required"),
});

// dynamic import
const SendMoneyTransaction = dynamic(
  () => import("./Transaction/SendMoneyTransaction"),
  {
    loading: () => null,
  },
);

const SendMoney = () => {
  const locale = useLocale();
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [confirmDetails, setConfirmDetails] = useState(null);
  const t = useTranslations("Dashboard.sendMoney");
  const tTrx = useTranslations("Dashboard.sendMoney.transactions");

  // api hooks
  const {
    data: sendMoneyIndexData,
    isLoading,
    error,
  } = useGetSendMoneyIndexQuery({
    lang: locale,
  });
  // send money submit
  const [sendMoneySubmit, { isLoading: sendMoneyLoading }] =
    useSendMoneySubmitMutation();
  // send money confirm
  const [sendMoneyConfirm, { isLoading: confirmLoading }] =
    useSendMoneyConfirmMutation();

  // trx api
  const { data: transactionsData, isLoading: isTrxLoading } =
    useGetTransactionsQuery({
      type: "money-transfer",
      page: 1,
      per_page: 5,
      lang: locale,
    });

  const sendMoneyData = sendMoneyIndexData?.data || {};
  const userWallets = useMemo(
    () =>
      isArrayCheck(sendMoneyData.user_wallet) ? sendMoneyData.user_wallet : [],
    [sendMoneyData.user_wallet],
  );
  const receiverWallets = useMemo(
    () =>
      isArrayCheck(sendMoneyData.receiver_wallets)
        ? sendMoneyData.receiver_wallets
        : [],
    [sendMoneyData.receiver_wallets],
  );
  const charges = sendMoneyData.charges || {};

  const [selectedSenderCurrency, setSelectedSenderCurrency] = useState("");
  const [selectedReceiverCurrency, setSelectedReceiverCurrency] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendMoneySchema),
    defaultValues: {
      sender_amount: "",
      recipient_amount: "",
    },
  });

  const senderAmount = watch("sender_amount");

  // Set default currencies
  useEffect(() => {
    if (userWallets.length > 0 && !selectedSenderCurrency) {
      setSelectedSenderCurrency(userWallets[0].currency_code);
    }
    if (receiverWallets.length > 0 && !selectedReceiverCurrency) {
      setSelectedReceiverCurrency(receiverWallets[0].currency_code);
    }
  }, [
    userWallets,
    receiverWallets,
    selectedSenderCurrency,
    selectedReceiverCurrency,
  ]);

  const selectedSenderWallet = useMemo(
    () => userWallets.find((w) => w.currency_code === selectedSenderCurrency),
    [userWallets, selectedSenderCurrency],
  );
  const selectedReceiverWallet = useMemo(
    () =>
      receiverWallets.find((w) => w.currency_code === selectedReceiverCurrency),
    [receiverWallets, selectedReceiverCurrency],
  );

  const exchangeRate = getExchangeRate(
    selectedSenderWallet?.rate,
    selectedReceiverWallet?.rate,
  );

  const { totalFee, totalPayable, recipientAmount } = useMemo(() => {
    if (!selectedSenderWallet || !senderAmount || isNaN(senderAmount)) {
      return { totalFee: 0, totalPayable: 0, recipientAmount: 0 };
    }

    const amount = parseFloat(senderAmount);
    // Convert fixed charge to sender's currency
    const fixedChargeInSenderCurrency =
      (charges.fixed_charge / charges.rate) * selectedSenderWallet.rate;
    const percentFee = (amount * charges.percent_charge) / 100;
    const fee = fixedChargeInSenderCurrency + percentFee;

    return {
      totalFee: Number(fee.toFixed(2)),
      totalPayable: Number((amount + fee).toFixed(2)),
      recipientAmount: Number((amount * exchangeRate).toFixed(2)),
    };
  }, [senderAmount, selectedSenderWallet, charges, exchangeRate]);

  const { minLimit, maxLimit } = useGatewayLimits(charges, exchangeRate);

  // Sync recipient amount when sender amount or currencies change
  useEffect(() => {
    if (recipientAmount) {
      setValue("recipient_amount", recipientAmount.toString());
    } else {
      setValue("recipient_amount", "");
    }
  }, [recipientAmount, setValue]);

  const handleSenderAmountChange = (e) => {
    const val = e.target.value;
    setValue("sender_amount", val);
  };

  const handleRecipientAmountChange = (e) => {
    const val = e.target.value;
    setValue("recipient_amount", val);
    if (!isNaN(val) && val !== "" && exchangeRate > 0) {
      const sAmt = parseFloat(val) / exchangeRate;
      setValue("sender_amount", sAmt.toFixed(2));
    } else {
      setValue("sender_amount", "");
    }
  };

  const onSubmit = (data) => {
    setFormData(data);
    setIsRecipientModalOpen(true);
  };

  const handleRecipientConfirm = async (recipient) => {
    try {
      const payload = {
        sender_amount: formData.sender_amount,
        sender_currency: selectedSenderCurrency,
        receiver_currency: selectedReceiverCurrency,
        recipient_id: recipient.key,
      };

      const res = await sendMoneySubmit({
        payload,
        lang: locale,
      }).unwrap();

      setConfirmDetails(res.data);

      showToast.apiSuccess(res);
      // setIsRecipientModalOpen(false);
      setFormData(null);
    } catch (error) {
      showToast.apiError(error);
    }
  };

  const handleConfirmSend = async (details) => {
    try {
      const res = await sendMoneyConfirm({
        payload: {
          identifier: details.identifier,
          recipient: details?.receipient_id,
        },
        lang: locale,
      }).unwrap();

      showToast.apiSuccess(res);
      setIsRecipientModalOpen(false);
      setConfirmDetails(null);
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
      label: t("summary.senderWallet"),
      value: `${selectedSenderWallet?.name || "N/A"} (${selectedSenderCurrency})`,
    },
    {
      label: t("summary.receiverWallet"),
      value: `${selectedReceiverWallet?.name || "N/A"} (${selectedReceiverCurrency})`,
    },
    {
      label: t("summary.sendingAmount"),
      value: `${senderAmount || 0} ${selectedSenderCurrency}`,
    },
    {
      label: t("summary.totalFees"),
      value: `${totalFee} ${selectedSenderCurrency}`,
    },
    {
      label: t("summary.exchangeRate"),
      value: `1 ${selectedSenderCurrency} = ${exchangeRate.toFixed(4)} ${selectedReceiverCurrency}`,
    },
    {
      label: t("summary.receiverWillGet"),
      value: `${recipientAmount} ${selectedReceiverCurrency}`,
    },
    {
      label: (
        <span className="font-bold text-base lg:text-lg">
          {t("summary.totalPayable")}
        </span>
      ),
      value: (
        <span className="font-bold text-base lg:text-lg">
          {totalPayable} {selectedSenderCurrency}
        </span>
      ),
    },
  ];

  return (
    <section>
      <div className="space-y-4 lg:space-y-6">
        <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
          <div className="col-span-1 md:col-span-3 ">
            <Card title={t("title")} className="h-full!">
              <div className="bg-neutral-50 dark:bg-slate-900 mb-4 dark-border rounded-2xl shadow-xs p-4 flex flex-col gap-3 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-50! dark:bg-primary-500! border border-primary/50">
                    <DollarSign className="w-4 h-4 text-primary dark:text-primary-50! " />
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-50! dark:bg-primary-500! border border-primary/50">
                    <ArrowUpRight className="w-4 h-4 text-primary dark:text-primary-50! " />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-white dark:bg-slate-900 dark-border rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">{t("exchangeRate")}</p>
                    <p
                      dir="ltr"
                      className="text-base lg:text-xl text-neutral-800 dark:text-neutral-300 font-semibold rtl:text-right"
                    >
                      1 {selectedSenderCurrency} = {exchangeRate.toFixed(4)}{" "}
                      {selectedReceiverCurrency}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 dark-border rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">
                      {t("availableBalance")}:
                    </p>
                    <p className="text-base lg:text-xl text-neutral-800 dark:text-neutral-300 font-semibold">
                      {selectedSenderWallet?.currency_symbol}{" "}
                      {selectedSenderWallet?.balance || "0.00"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl shadow-xs p-4 bg-neutral-50 dark:bg-slate-900 dark-border">
                <Form
                  onFinish={handleSubmit(onSubmit)}
                  layout="vertical space-y-4!"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <FormItem
                      label={t("senderAmount")}
                      required={true}
                      name="sender_amount"
                      errors={errors}
                    >
                      <Space.Compact size="large" className="w-full">
                        <Controller
                          name="sender_amount"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder={t("amountPlaceholder")}
                              type="number"
                              onChange={handleSenderAmountChange}
                            />
                          )}
                        />
                        <Select
                          value={selectedSenderCurrency}
                          onChange={setSelectedSenderCurrency}
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
                          className="w-32!"
                        />
                      </Space.Compact>
                    </FormItem>

                    <FormItem
                      label={t("recipientAmount")}
                      name={"recipient_amount"}
                      required={true}
                      errors={errors}
                    >
                      <Space.Compact size="large" className="w-full">
                        <Controller
                          name="recipient_amount"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder={t("amountPlaceholder")}
                              type="number"
                              onChange={handleRecipientAmountChange}
                            />
                          )}
                        />
                        <Select
                          value={selectedReceiverCurrency}
                          onChange={setSelectedReceiverCurrency}
                          options={receiverWallets.map((w) => ({
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
                          className="w-32!"
                        />
                      </Space.Compact>
                    </FormItem>
                  </div>

                  <div className="flex flex-col md:flex-row rtl:md:flex-row-reverse gap-2 justify-between items-center text-left rtl:text-right">
                    <p className="p-2 px-4 text-xs lg:text-base rounded-2xl bg-primary-50 dark:bg-primary-500! dark:text-primary-50! font-medium text-primary-600">
                      {t("limit")}:{" "}
                      <span dir="ltr">
                        {minLimit} {selectedSenderCurrency} - {maxLimit}{" "}
                        {selectedSenderCurrency}
                      </span>
                    </p>

                    <p className="p-2 px-4 text-xs lg:text-base rounded-2xl bg-primary-50 font-medium text-primary-600 dark:bg-primary-500! dark:text-primary-50!">
                      {t("charge")}:{" "}
                      <span dir="ltr">
                        {charges.fixed_charge} {charges.currency_code} +{" "}
                        {charges.percent_charge}%
                      </span>
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
                    {t("sendButton")}
                  </PrimaryButton>
                </Form>
              </div>
            </Card>
          </div>
          <div className="col-span-1 md:col-span-2">
            <Card title={t("summary.title")} className="h-full! ">
              <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-neutral-50 dark:bg-slate-900 dark-border shadow-xs   ">
                <div className="divide-y divide-gray-200 dark:divide-gray-800 ">
                  {singleTable?.map((row, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 text-sm"
                    >
                      <span className="text-gray-600 font-medium dark:text-gray-400">
                        {row.label}
                      </span>
                      <span
                        className={`text-gray-900 dark:text-gray-100 ${row.bold ? "font-semibold" : "font-medium"}`}
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
          <SendMoneyTransaction
            transactionsData={transactionsData?.data}
            loading={isTrxLoading}
            t={tTrx}
          />
        </div>
      </div>

      <RecipientsModal
        open={isRecipientModalOpen}
        onCancel={() => {
          setIsRecipientModalOpen(false);
          setFormData(null);
          setConfirmDetails(null);
        }}
        onConfirm={handleRecipientConfirm}
        onConfirmSend={handleConfirmSend}
        loading={sendMoneyLoading}
        confirmDetails={confirmDetails}
        confirmLoading={confirmLoading}
      />
    </section>
  );
};

export default SendMoney;
