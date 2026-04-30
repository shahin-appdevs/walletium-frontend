"use client";

import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Form, Input, Select, Space } from "antd";
import { ArrowUpRight, DollarSign, Ticket } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";
import dynamic from "next/dynamic";

const MyVoucherTransaction = dynamic(
  () => import("./_components/Transaction/MyVoucherTransaction"),
  { ssr: false, loading: () => null },
);

import CreateRedeemCode from "./_components/CreateRedeemCode";
import {
  useGetMyVoucherIndexQuery,
  useMyVoucherSubmitMutation,
  useMyVoucherRedeemSubmitMutation,
} from "@/redux/api/myVoucherApi";
import { isArrayCheck } from "@/utils/IsArrayCheck";
import { getImageUrl } from "@/utils/getImageUrl";
import { getExchangeRate } from "@/utils/exchangeRate";
import useGatewayLimits from "@/hooks/useGatewayLimits";
import showToast from "@/lib/toast";
import { useLocale } from "next-intl";
import useModal from "@/hooks/useModal";
import SendMoneyPageSkeleton from "../send-money/_components/SendMoneySkeleton/SendMoneyPageSkeleton";

const voucherCreateSchema = yup.object({
  amount: yup.string().required("Amount is required"),
});

const voucherRedeemSchema = yup.object({
  redeem_code: yup.string().required("Redeem Code is required"),
});

const MyVoucher = () => {
  const locale = useLocale();

  const {
    data: voucherIndexData,
    isLoading,
    error,
  } = useGetMyVoucherIndexQuery({
    lang: locale,
  });

  const [myVoucherSubmit, { isLoading: isSubmitting }] =
    useMyVoucherSubmitMutation();
  const [myVoucherRedeemSubmit, { isLoading: isRedeeming }] =
    useMyVoucherRedeemSubmitMutation();

  const voucherData = voucherIndexData?.data || {};
  const userWallets = useMemo(
    () =>
      isArrayCheck(voucherData.user_wallet) ? voucherData.user_wallet : [],
    [voucherData.user_wallet],
  );
  const charges = voucherData.charges || {};

  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  // Modal for redeem code display
  const { isModalOpen, handleShowModal, handleCancelModal } = useModal();

  // Create Voucher Form
  const {
    control: createControl,
    handleSubmit: handleCreateSubmit,
    setValue: setCreateValue,
    watch: watchCreate,
    reset: resetCreate,
    formState: { errors: createErrors },
  } = useForm({
    resolver: yupResolver(voucherCreateSchema),
    defaultValues: {
      amount: "",
    },
  });

  // Redeem Voucher Form
  const {
    control: redeemControl,
    handleSubmit: handleRedeemSubmit,
    reset: resetRedeem,
    formState: { errors: redeemErrors },
  } = useForm({
    resolver: yupResolver(voucherRedeemSchema),
    defaultValues: {
      redeem_code: "",
    },
  });

  const createAmount = watchCreate("amount");

  // Set default currency when wallets load
  useEffect(() => {
    if (userWallets.length > 0 && !selectedCurrency) {
      setSelectedCurrency(userWallets[0].currency_code);
    }
  }, [userWallets, selectedCurrency]);

  const selectedWallet = useMemo(
    () => userWallets.find((w) => w.currency_code === selectedCurrency),
    [userWallets, selectedCurrency],
  );

  // Fee calculation
  const { totalFee, totalPayable, willGet } = useMemo(() => {
    if (!selectedWallet || !createAmount || isNaN(createAmount)) {
      return { totalFee: 0, totalPayable: 0, willGet: 0 };
    }

    const amount = parseFloat(createAmount);
    const fixedChargeInWalletCurrency =
      (charges.fixed_charge / charges.rate) * selectedWallet.rate;
    const percentFee = (amount * charges.percent_charge) / 100;
    const fee = fixedChargeInWalletCurrency + percentFee;

    return {
      totalFee: Number(fee.toFixed(2)),
      totalPayable: Number((amount + fee).toFixed(2)),
      willGet: Number(amount.toFixed(2)),
    };
  }, [createAmount, selectedWallet, charges]);

  // Limits
  const limitRate =
    charges.rate && selectedWallet?.rate
      ? charges.rate / selectedWallet.rate
      : 1;
  const { minLimit, maxLimit } = useGatewayLimits(charges, limitRate);

  // Fixed charge display
  const fixedCharge = (
    charges.fixed_charge *
      getExchangeRate(charges.rate, selectedWallet?.rate) || 0
  ).toFixed(2);

  // Create Voucher Submit
  const onCreateSubmit = async (data) => {
    try {
      const payload = {
        amount: data.amount,
        request_currency: selectedCurrency,
      };

      const res = await myVoucherSubmit({
        payload,
        lang: locale,
      }).unwrap();

      showToast.apiSuccess(res);

      // Extract the generated code from the response
      const code = res?.data?.voucher?.code || res?.data?.code || "";
      if (code) {
        setGeneratedCode(code);
        handleShowModal();
      }

      resetCreate({ amount: "" });
    } catch (error) {
      showToast.apiError(error);
    }
  };

  // Redeem Voucher Submit
  const onRedeemSubmit = async (data) => {
    try {
      const payload = {
        code: data.redeem_code,
      };

      const res = await myVoucherRedeemSubmit({
        payload,
        lang: locale,
      }).unwrap();

      showToast.apiSuccess(res);
      resetRedeem({ redeem_code: "" });
    } catch (error) {
      showToast.apiError(error);
    }
  };

  if (isLoading) return <SendMoneyPageSkeleton />;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">Error loading data</div>
    );

  const singleTable = [
    {
      label: "Entered Amount",
      value: (
        <span dir="ltr" className="font-medium text-sm xl:text-base">
          {createAmount || 0} {selectedCurrency}
        </span>
      ),
    },
    {
      label: "Total Fees & Charges",
      value: (
        <span dir="ltr" className="font-medium text-sm xl:text-base">
          {totalFee} {selectedCurrency}
        </span>
      ),
    },
    {
      label: "Will Get",
      value: (
        <span dir="ltr" className="font-medium text-sm xl:text-base">
          {willGet} {selectedCurrency}
        </span>
      ),
    },
    {
      label: (
        <span className="font-bold text-sm xl:text-lg">
          Total Payable Amount
        </span>
      ),
      value: (
        <span dir="ltr" className="font-bold text-sm xl:text-lg">
          {totalPayable} {selectedCurrency}
        </span>
      ),
    },
  ];

  const CreateRedeemCodeProps = {
    isModalOpen,
    handleCancelModal,
    handleOkModal: handleCancelModal,
    generatedCode,
  };

  return (
    <section>
      <div className="space-y-4 lg:space-y-6">
        <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
          <div className="col-span-1 md:col-span-3 ">
            <Card title="My Voucher" className="h-full!">
              <CreateRedeemCode {...CreateRedeemCodeProps} />

              {/* Info Cards */}
              <div className="mb-4 bg-neutral-50 dark:bg-slate-900 dark-border rounded-2xl shadow-xs p-4 flex flex-col gap-3 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-50! dark:bg-primary-500! border border-primary/50">
                    <Ticket className="w-4 h-4 text-primary dark:text-primary-50! " />
                  </div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-50! dark:bg-primary-500! border border-primary/50">
                    <ArrowUpRight className="w-4 h-4 text-primary dark:text-primary-50! " />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-white dark:bg-slate-900 dark-border rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">Available Balance</p>
                    <p
                      dir="ltr"
                      className="text-base! lg:text-lg! text-neutral-800 dark:text-neutral-300 font-semibold! rtl:text-right"
                    >
                      {selectedWallet?.currency_symbol}{" "}
                      {Number(selectedWallet?.balance || 0).toFixed(4)}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 dark-border rounded-2xl p-4">
                    <p className="text-gray-500 text-sm">Selected Wallet</p>
                    <p className="text-base! lg:text-lg! text-neutral-800 dark:text-neutral-300 font-semibold!">
                      {selectedWallet?.name || "N/A"} ({selectedCurrency})
                    </p>
                  </div>
                </div>
              </div>

              {/* Create Voucher Form */}
              <div className="rounded-2xl shadow-xs p-4 bg-neutral-50 dark:bg-slate-900 dark-border ">
                <Form
                  onFinish={handleCreateSubmit(onCreateSubmit)}
                  layout="vertical space-y-4!  "
                >
                  <div>
                    <FormItem
                      required={true}
                      label={"Amount"}
                      name={"amount"}
                      errors={createErrors}
                    >
                      <div className="flex flex-col md:flex-row gap-2 items-center">
                        <Space.Compact size="large" className="w-full ">
                          <Controller
                            name="amount"
                            control={createControl}
                            render={({ field }) => (
                              <div className="w-full relative">
                                <Input
                                  {...field}
                                  placeholder="Enter Amount"
                                  type="number"
                                />
                              </div>
                            )}
                          />
                          <Select
                            value={selectedCurrency}
                            onChange={setSelectedCurrency}
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
                        <PrimaryButton
                          type="submit"
                          loading={isSubmitting}
                          className={"text-base shrink-0"}
                          iconClassName={
                            "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300"
                          }
                        >
                          Create{" "}
                        </PrimaryButton>
                      </div>
                    </FormItem>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <p className="p-2 text-xs lg:text-base px-4 rounded-2xl bg-primary-50 dark:bg-primary-500! dark:text-primary-50! font-medium text-primary-600">
                      Limit:{" "}
                      <span dir="ltr">
                        {minLimit} {selectedCurrency} - {maxLimit}{" "}
                        {selectedCurrency}
                      </span>
                    </p>
                    <p className="p-2 px-4 text-xs lg:text-base rounded-2xl bg-primary-50  font-medium text-primary-600 dark:bg-primary-500! dark:text-primary-50!">
                      Charge:{" "}
                      <span dir="ltr">
                        {fixedCharge} {selectedCurrency} +{" "}
                        {charges?.percent_charge}%
                      </span>
                    </p>
                  </div>
                </Form>
              </div>

              {/* Redeem Voucher Form */}
              <div className="rounded-2xl shadow-xs p-4 bg-neutral-50 dark:bg-slate-900 dark-border mt-4">
                <Form
                  onFinish={handleRedeemSubmit(onRedeemSubmit)}
                  layout="vertical space-y-4!"
                >
                  <FormItem
                    label="Redeem Code"
                    required={true}
                    name="redeem_code"
                    errors={redeemErrors}
                  >
                    <Controller
                      name="redeem_code"
                      control={redeemControl}
                      render={({ field }) => (
                        <div className="w-full relative">
                          <Input
                            {...field}
                            placeholder="Enter Redeem Code"
                            type="text"
                            size="large"
                          />
                        </div>
                      )}
                    />
                  </FormItem>
                  <PrimaryButton
                    icon="ArrowUpRight"
                    type="submit"
                    loading={isRedeeming}
                    className={"text-base w-full"}
                    iconClassName={
                      "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1"
                    }
                  >
                    Confirm Redeem
                  </PrimaryButton>
                </Form>
              </div>
            </Card>
          </div>
          <div className="col-span-1 md:col-span-2">
            <Card title="Summary" className="h-full!">
              <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-neutral-50 dark:bg-slate-900 dark-border shadow-xs ">
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {singleTable?.map((row, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 text-sm gap-2"
                    >
                      <span className="text-gray-600 font-medium dark:text-gray-400">
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
          <MyVoucherTransaction />
        </div>
      </div>
    </section>
  );
};

export default MyVoucher;
