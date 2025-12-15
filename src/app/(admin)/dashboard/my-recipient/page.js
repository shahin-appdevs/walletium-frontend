"use client";

import React from "react";
import { useForm } from "react-hook-form";
import PageTopBar from "../../_components/header/PageTopBar";
import RecipientList from "./_components/RecipientList";
import LucideIcon from "@/components/LucideIcon";

const MyRecipients = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      senderCurrency: "USD",
      recipientsCurrency: "USD",
      amount: "",
      paymentGateway: "Paypal USD",
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
        <PageTopBar
          buttonTitle={"Add New Recipient"}
          icon={"Plus"}
          href="/dashboard/my-recipient/add-new-recipient"
        />

        <div>
          <RecipientList />
        </div>
      </div>
    </section>
  );
};

export default MyRecipients;
