import BrushBarChart from "@/components/charts/BrushChart";
import { Card } from "antd";
import { useTranslations } from "next-intl";

const TransactionOverview = () => {
  const t = useTranslations("Dashboard.home");
  return (
    <div>
      <Card
        title={
          <span className="text-xl font-bold text-neutral-800 dark:text-neutral-300 ">
            {t("overviewTitle")}
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
