import BrushBarChart from "@/components/charts/BrushChart";
import { Card } from "antd";

const TransactionOverview = () => {
  return (
    <div>
      <Card
        title={
          <span className="text-xl font-bold text-neutral-800 dark:text-neutral-300 ">
            Transaction Overview
          </span>
        }
        className="shadow-xs border-0!"
      >
        <BrushBarChart />
      </Card>
    </div>
  );
};

export default TransactionOverview;
