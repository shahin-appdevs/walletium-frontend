import React from "react";
import { Card } from "antd";
import MyCardStats from "./_components/MyCardStats/MyCardStats";
import AvailableCards from "./_components/AvailableCards/AvailableCards";

const MyCard = () => {
  return (
    <div className="space-y-4!">
      <MyCardStats />
      <AvailableCards />
    </div>
  );
};

export default MyCard;
