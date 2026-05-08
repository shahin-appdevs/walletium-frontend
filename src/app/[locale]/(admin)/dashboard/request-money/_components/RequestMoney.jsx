"use client";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FormItem from "@/components/ui/form/FormItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Form, Input, Modal, Select, Space, Tooltip } from "antd";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ArrowUpRight, DollarSign } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
import dynamic from "next/dynamic";
import TransactionTableSkeleton from "../../../_components/Skeleton/TransactionTableSkeleton";
import FailedToLoad from "@/components/partials/FailedToLoad";
import { useRouter } from "next/navigation";

const RequestMoneyTransaction = dynamic(
  () => import("./RequestMoneyTransaction"),
  {
    loading: () => <TransactionTableSkeleton />,
    ssr: false,
  },
);

const requestMoneySchema = yup.object({
  request_amount: yup.string().required("Request amount is required"),
  remarks: yup.string().optional(),
});

const RequestMoney = () => {
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const t = useTranslations("Dashboard.requestMoney");
  const tTrx = useTranslations("Dashboard.requestMoney.transactions");
  const tc = useTranslations("common");
  const router = useRouter();

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
      lang: locale,
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
      return {
        totalFee: 0,
        totalPayable: 0,
        fixedCharge: charges.fixed_charge,
      };
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
    showToast.success(t("modal.copySuccess") || "Link copied to clipboard");
  };

  if (isLoading) return <RequestMoneySkeleton />;

  if (error) {
    const checkKyc = error?.data?.message?.error?.includes(
      "Please! submit your KYC information first",
    );

    return (
      <FailedToLoad
        title={t("errorLoading") || "Failed to load Request Money information."}
        message={error?.data?.message?.error[0]}
        redirectTo={() =>
          router.push(
            checkKyc ? "/dashboard/security/kyc-verification" : "/dashboard",
          )
        }
        btnText={checkKyc ? tc("action.submitKyc") : tc("action.goToDashboard")}
      />
    );
  }

  const singleTable = [
    {
      label: t("summary.requestWallet"),
      value: `${selectedWallet?.name || "N/A"} (${selectedCurrency})`,
    },
    {
      label: t("summary.requestAmount"),
      value: `${Number(requestAmount || 0).toFixed(2)} ${selectedCurrency}`,
    },
    {
      label: t("summary.totalFees"),
      value: `${Number(totalFee || 0).toFixed(2)} ${selectedCurrency}`,
    },
    {
      label: (
        <span className="font-bold text-base lg:text-lg">
          {t("summary.totalPayable")}
        </span>
      ),
      value: (
        <span className="font-bold text-base lg:text-lg inline-block py-1 ">
          {Number(totalPayable || 0).toFixed(2)} {selectedCurrency}
        </span>
      ),
    },
  ];

  return (
    <section>
      <div className="space-y-4 lg:space-y-6">
        <div className="grid xl:grid-cols-5 gap-4 lg:gap-6">
          <div className="col-span-1 xl:col-span-3 ">
            <Card title={t("title")} className="h-full!">
              <div className="mb-4 bg-neutral-50 dark:bg-slate-950  rounded-2xl shadow-xs p-4 flex flex-col gap-3 overflow-hidden">
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
                  <div className="  rounded-2xl p-4 bg-white dark:bg-slate-800 flex items-center  justify-between">
                    <p className="text-gray-500 dark:text-gray-400 text-base!">
                      {t("availableBalance")}:
                    </p>
                    <p
                      dir="ltr"
                      className="text-lg! font-medium! text-neutral-800 dark:text-neutral-300 "
                    >
                      {selectedWallet?.currency_symbol}{" "}
                      {selectedWallet?.balance?.toFixed(4) || "0.0000"}
                    </p>
                  </div>
                </div>
              </div>

              {/* form start */}
              <div className="rounded-2xl shadow-xs p-4 bg-neutral-50 dark:bg-slate-950 ">
                <Form
                  onFinish={handleSubmit(onSubmit)}
                  layout="vertical space-y-4!  "
                >
                  <div>
                    <FormItem
                      required
                      label={t("requestAmount")}
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
                                placeholder={t("amountPlaceholder")}
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
                          className="w-40!"
                        />
                      </Space.Compact>
                    </FormItem>
                    <Form.Item
                      label={
                        <span>
                          {t("remarks")}{" "}
                          <span className="text-primary-500">
                            ({t("optional")})
                          </span>
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
                              placeholder={t("remarksPlaceholder")}
                              size="large"
                            />
                          </div>
                        )}
                      />
                    </Form.Item>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <p className="p-2 text-xs lg:text-base px-4 rounded-2xl bg-primary-50 dark:bg-primary-500! dark:text-primary-50! font-medium text-primary-600">
                      {t("limit")}:{" "}
                      <span dir="ltr">
                        {minLimit} {selectedCurrency} - {maxLimit}{" "}
                        {selectedCurrency}
                      </span>
                    </p>
                    <p className="p-2 px-4 text-xs lg:text-base rounded-2xl bg-primary-50  font-medium text-primary-600 dark:bg-primary-500! dark:text-primary-50!">
                      {t("charge")}:{" "}
                      <span dir="ltr">
                        {Number(fixedCharge || 0).toFixed(2)} {selectedCurrency}{" "}
                        + {charges.percent_charge}%
                      </span>
                    </p>
                  </div>
                  <PrimaryButton
                    icon={!submitLoading && "ArrowUpRight"}
                    type="submit"
                    className={"text-base w-full"}
                    loading={submitLoading}
                    iconClassName={
                      "group-hover/primary-btn:translate-1/6 group-hover/primary-btn:-translate-y-1 duration-300 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1 rtl:-rotate-90 rtl:group-hover/primary-btn:-translate-x-1"
                    }
                  >
                    {t("requestButton")}
                  </PrimaryButton>
                </Form>
              </div>
            </Card>
          </div>
          <div className="col-span-1 xl:col-span-2">
            <Card title={t("summary.title")} className="h-full!">
              <div className="w-full  p-4 rounded-xl bg-neutral-50 dark:bg-slate-950 shadow-xs ">
                <div className="space-y-4">
                  {singleTable?.map((row, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm last:border-t last:border-gray-200 dark:last:border-gray-800"
                    >
                      <span className="text-gray-600 dark:text-gray-400">
                        {row.label}
                      </span>

                      <span
                        dir="ltr"
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
          <RequestMoneyTransaction
            transactions={transactions}
            t={tTrx}
            tc={tc}
            loading={isTrxLoading}
          />
        </div>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckOutlined className="text-green-600" />
            </div>
            <span>{t("modal.title")}</span>
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
            {tc("action.close") || "Close"}
          </PrimaryButton>,
        ]}
        centered
      >
        <div className="space-y-4 py-4 text-left rtl:text-right">
          <p className="text-gray-600">{t("modal.description")}</p>
          <Space.Compact className="w-full">
            <Input
              value={shareLink}
              readOnly
              dir="ltr"
              className="py-2 rounded-l-xl rtl:rounded-r-xl rtl:rounded-l-none bg-gray-50 border-gray-200 text-left rtl:text-right"
            />

            <Tooltip title={t("modal.copyLink")}>
              <Button
                type="default"
                onClick={copyToClipboard}
                icon={<CopyOutlined />}
                className="rounded-r-xl rtl:rounded-l-xl rtl:rounded-r-none"
              />
            </Tooltip>
          </Space.Compact>
          <p className="text-xs text-gray-400">{t("modal.footer")}</p>
        </div>
      </Modal>
    </section>
  );
};

export default RequestMoney;
