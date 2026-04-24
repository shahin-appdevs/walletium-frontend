"use client";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Form, Input, Modal, Select, Space, Tooltip } from "antd";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import RequestMoneyTransaction from "./RequestMoneyTransaction";
import { ArrowUpRight, DollarSign } from "lucide-react";
import { useLocale } from "next-intl";
import {
  useGetRequestMoneyIndexQuery,
  useRequestMoneySubmitMutation,
} from "@/redux/api/requestMoneyApi";
import RequestMoneySkeleton from "./skeletons/RequestMoneySkeleton";
import { useEffect, useMemo, useState } from "react";
import { isArrayCheck } from "@/utils/IsArrayCheck";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import useGatewayLimits from "@/hooks/useGatewayLimits";
import showToast from "@/lib/toast";
import { getExchangeRate } from "@/utils/exchangeRate";
import { useGetRequestMoneyTrxQuery } from "@/redux/api/transactionsApi";

const requestMoneySchema = yup.object({
  request_amount: yup.string().required("Request amount is required"),
  remarks: yup.string().optional(),
});

const RequestMoney = () => {
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");

  // api hooks
  const {
    data: requestMoneyIndexData,
    isLoading,
    error,
  } = useGetRequestMoneyIndexQuery({
    lang: locale,
  });

  const [requestMoneySubmit, { isLoading: submitLoading }] =
    useRequestMoneySubmitMutation();

  // trx api
  const { data: transactionsData, isLoading: isTrxLoading } =
    useGetRequestMoneyTrxQuery({
      page: 1,
      per_page: 5,
    });

  const transactions = transactionsData?.transactions?.data || [];

  const requestMoneyData = requestMoneyIndexData?.data || {};
  const userWallets = useMemo(
    () =>
      isArrayCheck(requestMoneyData.user_wallet)
        ? requestMoneyData.user_wallet
        : [],
    [requestMoneyData.user_wallet],
  );
  const charges = requestMoneyData.charges || {};

  const [selectedCurrency, setSelectedCurrency] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requestMoneySchema),
    defaultValues: {
      request_amount: "",
      remarks: "",
    },
  });

  const requestAmount = watch("request_amount");

  // Set default currency
  useEffect(() => {
    if (userWallets.length > 0 && !selectedCurrency) {
      setSelectedCurrency(userWallets[0].currency_code);
    }
  }, [userWallets, selectedCurrency]);

  const selectedWallet = useMemo(
    () => userWallets.find((w) => w.currency_code === selectedCurrency),
    [userWallets, selectedCurrency],
  );

  // For request money, exchange rate is 1 (same currency in/out)
  const exchangeRate = getExchangeRate(selectedWallet?.rate, charges?.rate);

  const { totalFee, totalPayable, fixedCharge } = useMemo(() => {
    const amount = parseFloat(requestAmount);
    if (!selectedWallet || !amount || isNaN(amount)) {
      return { totalFee: 0, totalPayable: 0 };
    }

    const fixedChargeInSelectedCurrency =
      (charges.fixed_charge / charges.rate) * selectedWallet.rate;
    const percentFee = (amount * charges.percent_charge) / 100;
    const fee = fixedChargeInSelectedCurrency + percentFee;

    return {
      totalFee: Number(fee.toFixed(2)),
      totalPayable: Number((amount + fee).toFixed(2)),
      fixedCharge: fixedChargeInSelectedCurrency,
    };
  }, [requestAmount, selectedWallet, charges]);

  const { minLimit, maxLimit } = useGatewayLimits(charges, exchangeRate);

  const onSubmit = async (data) => {
    try {
      const payload = {
        amount: data.request_amount,
        request_currency: selectedCurrency,
        remark: data.remarks || "",
      };

      const res = await requestMoneySubmit({
        payload,
        lang: locale,
      }).unwrap();

      showToast.apiSuccess(res);

      if (res?.data?.link) {
        const link = res.data.link;
        const token = link.split("/").pop();
        // Assuming the base URL for sharing is the current origin
        const baseUrl = window.location.origin;
        const formattedLink = `${baseUrl}/${locale}/dashboard/request-money/share?token=${token}`;
        setShareLink(formattedLink);
        setIsModalOpen(true);
        reset({});
      }
    } catch (error) {
      showToast.apiError(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    showToast.success("Link copied to clipboard");
  };

  if (isLoading) return <RequestMoneySkeleton />;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load Request Money information.
      </div>
    );

  const singleTable = [
    {
      label: "Request Wallet",
      value: `${selectedWallet?.name || "N/A"} (${selectedCurrency})`,
    },
    {
      label: "Request Amount",
      value: `${requestAmount || 0} ${selectedCurrency}`,
    },
    {
      label: "Total Fees & Charges",
      value: `${totalFee} ${selectedCurrency}`,
    },
    {
      label: (
        <span className="font-bold text-base lg:text-lg">
          Total Payable Amount
        </span>
      ),
      value: (
        <span className="font-bold text-base lg:text-lg">
          {totalPayable} {selectedCurrency}
        </span>
      ),
    },
  ];

  return (
    <section>
      <div className="space-y-4 lg:space-y-6">
        <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
          <div className="col-span-1 md:col-span-3 ">
            <Card title="Request Money" className="h-full!">
              <div className="mb-4 bg-neutral-50 dark:bg-slate-900 dark-border  rounded-2xl shadow-xs p-4 flex flex-col gap-3 overflow-hidden">
                <div className="flex items-center justify-between ">
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

                <div className="grid grid-cols-1 ">
                  <div className="  rounded-2xl p-4 bg-white dark:bg-slate-900 dark-border flex items-center  justify-between">
                    <p className="text-gray-500 text-base!">
                      Available balance:
                    </p>
                    <p className="text-lg! font-medium! text-neutral-800 dark:text-neutral-300 ">
                      {selectedWallet?.currency_symbol}{" "}
                      {selectedWallet?.balance?.toFixed(4) || "0.0000"}
                    </p>
                  </div>
                </div>
              </div>

              {/* form start */}
              <div className="rounded-2xl shadow-xs p-4 bg-neutral-50 dark:bg-slate-900 dark-border">
                <Form
                  onFinish={handleSubmit(onSubmit)}
                  layout="vertical space-y-4!  "
                >
                  <div>
                    <FormItem
                      required
                      label={"Request Amount"}
                      name={"request_amount"}
                      errors={errors}
                    >
                      <Space.Compact size="large" className="w-full">
                        <Controller
                          name="request_amount"
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
                        <Select
                          value={selectedCurrency}
                          onChange={setSelectedCurrency}
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
                    <Form.Item
                      label={
                        <span>
                          Remarks{" "}
                          <span className="text-primary-500">(Optional)</span>
                        </span>
                      }
                    >
                      <Controller
                        name="remarks"
                        control={control}
                        render={({ field, fieldState }) => (
                          <div className="w-full relative">
                            <Input.TextArea
                              rows={4}
                              {...field}
                              placeholder="Explain Request Process Here"
                              size="large"
                            />
                          </div>
                        )}
                      />
                    </Form.Item>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <p className="p-2 text-xs lg:text-base px-4 rounded-2xl bg-primary-50 dark:bg-primary-500! dark:text-primary-50! font-medium text-primary-600">
                      Limit: {minLimit} {selectedCurrency} - {maxLimit}{" "}
                      {selectedCurrency}
                    </p>
                    <p className="p-2 px-4 text-xs lg:text-base rounded-2xl bg-primary-50  font-medium text-primary-600 dark:bg-primary-500! dark:text-primary-50!">
                      Charge: {fixedCharge} {selectedCurrency} +{" "}
                      {charges.percent_charge}%
                    </p>
                  </div>
                  <PrimaryButton
                    icon={!submitLoading && "ArrowUpRight"}
                    type="submit"
                    className={"text-base w-full"}
                    loading={submitLoading}
                    iconClassName={
                      "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1"
                    }
                  >
                    Request Money{" "}
                  </PrimaryButton>
                </Form>
              </div>
            </Card>
          </div>
          <div className="col-span-1 md:col-span-2">
            <Card title="Summary" className="h-full!">
              <div className="w-full max-w-2xl mx-auto p-4 rounded-xl bg-neutral-50 dark:bg-slate-900 shadow-xs  dark-border">
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
          <RequestMoneyTransaction transactions={transactions} />
        </div>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckOutlined className="text-green-600" />
            </div>
            <span>Request Submitted Successfully</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <PrimaryButton
            key="close"
            onClick={() => setIsModalOpen(false)}
            className="w-full"
          >
            Close
          </PrimaryButton>,
        ]}
        centered
      >
        <div className="space-y-4 py-4 text-left rtl:text-right">
          <p className="text-gray-600">
            Your money request has been submitted. You can share this link with
            the recipient:
          </p>
          <Space.Compact className="w-full">
            <Input
              value={shareLink}
              readOnly
              dir="ltr"
              className="py-2 rounded-l-xl rtl:rounded-r-xl rtl:rounded-l-none bg-gray-50 border-gray-200 text-left rtl:text-right"
            />

            <Tooltip title="Copy Link">
              <Button
                type="default"
                onClick={copyToClipboard}
                icon={<CopyOutlined />}
                className="rounded-r-xl rtl:rounded-l-xl rtl:rounded-r-none"
              />
            </Tooltip>
          </Space.Compact>
          <p className="text-xs text-gray-400">
            The recipient will be able to view and fulfill your request using
            this link.
          </p>
        </div>
      </Modal>
    </section>
  );
};

export default RequestMoney;
