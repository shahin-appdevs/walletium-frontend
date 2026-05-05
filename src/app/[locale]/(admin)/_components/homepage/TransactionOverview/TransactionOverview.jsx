import BrushBarChart from "@/components/charts/BrushChart";
import { Card } from "antd";
import { useTranslations } from "next-intl";

const TransactionOverview = () => {
  const t = useTranslations("Dashboard.home");
  return (
    <div>
      <Card
        title={
          <h5 className=" font-bold text-neutral-800 dark:text-neutral-300 ">
            {t("overviewTitle")}
          </h5>
        }
        className="shadow-xs border-0!"
      >
        <BrushBarChart />
      </Card>
    </div>
  );
};

export default TransactionOverview;
