import BrushBarChart from "@/components/charts/BrushChart";
import { useDashboardContext } from "@/contexts/DashboardProvider";
import getTransformChartData from "@/utils/getTransformChartData";
import { Card } from "antd";
import { useTranslations } from "next-intl";

const TransactionOverview = () => {
  const t = useTranslations("Dashboard.home");
  const { dashboardData, dashboardLoading } = useDashboardContext();

  const chartData = getTransformChartData(dashboardData?.chart_data);
  close;

  if (dashboardLoading) {
    return null;
  }

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
        <BrushBarChart data={chartData} />
      </Card>
    </div>
  );
};

export default TransactionOverview;
