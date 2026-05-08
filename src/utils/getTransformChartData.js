/**
 * Transforms raw chart API response into Recharts compatible format
 * @param {Object} chartData - Raw data from API
 * @returns {Array} Transformed data for Recharts
 */

import { isArrayCheck } from "./IsArrayCheck";

// Map API keys → display labels (single place to update)
const CHART_FIELD_MAP = {
  add_money: "Add Money",
  send_money: "Send Money",
  withdraq_money: "Withdraw Money",
};

const getTransformChartData = (chartData) => {
  if (!chartData || typeof chartData !== "object") {
    console.warn("transformChartData: Invalid or missing chartData");
    return [];
  }

  const { chart_one_data, month_day } = chartData;

  if (
    !isArrayCheck(month_day) ||
    !chart_one_data ||
    typeof chart_one_data !== "object"
  ) {
    console.warn("transformChartData: Missing required fields");
    return [];
  }

  // Extract series data dynamically from field map
  const series = Object.entries(CHART_FIELD_MAP).reduce(
    (acc, [apiKey, label]) => {
      acc[label] = isArrayCheck(chart_one_data[apiKey])
        ? chart_one_data[apiKey]
        : [];
      return acc;
    },
    {},
  );

  return month_day.map((date, index) => {
    // "2026-05-04" → "04"
    const dayNumber =
      typeof date === "string" ? (date.split("-")[2] ?? "01") : "01";

    const fullDate = new Date(date);
    const monthNameEn = fullDate.toLocaleString("en-US", { month: "long" });

    // Build data point dynamically
    const dataPoint = { name: `${monthNameEn} ${dayNumber}` };

    Object.entries(series).forEach(([label, values]) => {
      dataPoint[label] = Number(values[index] ?? 0);
    });

    return dataPoint;
  });
};

export default getTransformChartData;
