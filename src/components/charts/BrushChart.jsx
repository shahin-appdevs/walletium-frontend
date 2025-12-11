import {
  BarChart,
  Bar,
  // Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// #region Sample data
// const data = [
//   {
//     name: "01 Dec",
//     "Add Money": 300,
//     "Send Money": 456,
//     "Withdraw Money": 500,
//   },
//   {
//     name: "02 Dec",
//     "Add Money": 145,
//     "Send Money": 230,
//     "Withdraw Money": 600,
//   },
//   // { name: "3", uv: 100, pv: 345 },
//   // { name: "4", uv: 8, pv: 450 },
//   // { name: "5", uv: 100, pv: 321 },
//   // { name: "6", uv: 9, pv: 235 },
//   // { name: "7", uv: 53, pv: 267 },
//   // { name: "8", uv: 252, pv: 378 },
//   // { name: "9", uv: 79, pv: 210 },
//   // { name: "10", uv: 294, pv: 23 },
//   // { name: "12", uv: 43, pv: 45 },
//   // { name: "13", uv: 74, pv: 90 },
//   // { name: "14", uv: 71, pv: 130 },
//   // { name: "15", uv: 117, pv: 11 },
//   // { name: "16", uv: 186, pv: 107 },
//   // { name: "17", uv: 16, pv: 926 },
//   // { name: "18", uv: 125, pv: 653 },
//   // { name: "19", uv: 222, pv: 366 },
//   // { name: "20", uv: 372, pv: 486 },
//   // { name: "21", uv: 182, pv: 512 },
//   // { name: "22", uv: 164, pv: 302 },
//   // { name: "23", uv: 316, pv: 425 },
//   // { name: "24", uv: 131, pv: 467 },
//   // { name: "25", uv: 291, pv: 190 },
//   // { name: "26", uv: 47, pv: 194 },
//   // { name: "27", uv: 415, pv: 371 },
//   // { name: "28", uv: 182, pv: 376 },
//   // { name: "29", uv: 93, pv: 295 },
//   // { name: "30", uv: 99, pv: 322 },
//   // { name: "31", uv: 52, pv: 246 },
//   // { name: "32", uv: 154, pv: 33 },
//   // { name: "33", uv: 205, pv: 354 },
//   // { name: "34", uv: 70, pv: 258 },
//   // { name: "35", uv: 25, pv: 359 },
//   // { name: "36", uv: 59, pv: 192 },
//   // { name: "37", uv: 63, pv: 464 },
//   // { name: "38", uv: 91, pv: 2 },
//   // { name: "39", uv: 66, pv: 154 },
//   // { name: "40", uv: 50, pv: 186 },
// ];

const data = [
  {
    name: "01 Dec",
    "Add Money": 300,
    "Send Money": 456,
    "Withdraw Money": 500,
  },
  {
    name: "02 Dec",
    "Add Money": 145,
    "Send Money": 230,
    "Withdraw Money": 600,
  },
  {
    name: "03 Dec",
    "Add Money": 210,
    "Send Money": 340,
    "Withdraw Money": 480,
  },
  {
    name: "04 Dec",
    "Add Money": 390,
    "Send Money": 290,
    "Withdraw Money": 520,
  },
  {
    name: "05 Dec",
    "Add Money": 260,
    "Send Money": 410,
    "Withdraw Money": 450,
  },
  {
    name: "06 Dec",
    "Add Money": 320,
    "Send Money": 280,
    "Withdraw Money": 570,
  },
  {
    name: "07 Dec",
    "Add Money": 275,
    "Send Money": 360,
    "Withdraw Money": 610,
  },
  {
    name: "08 Dec",
    "Add Money": 350,
    "Send Money": 420,
    "Withdraw Money": 490,
  },
  {
    name: "09 Dec",
    "Add Money": 295,
    "Send Money": 310,
    "Withdraw Money": 530,
  },
  {
    name: "10 Dec",
    "Add Money": 330,
    "Send Money": 260,
    "Withdraw Money": 580,
  },
  {
    name: "11 Dec",
    "Add Money": 360,
    "Send Money": 300,
    "Withdraw Money": 540,
  },
  {
    name: "12 Dec",
    "Add Money": 250,
    "Send Money": 390,
    "Withdraw Money": 620,
  },
  {
    name: "13 Dec",
    "Add Money": 410,
    "Send Money": 280,
    "Withdraw Money": 500,
  },
  {
    name: "14 Dec",
    "Add Money": 270,
    "Send Money": 340,
    "Withdraw Money": 560,
  },
  {
    name: "15 Dec",
    "Add Money": 305,
    "Send Money": 420,
    "Withdraw Money": 610,
  },
  {
    name: "16 Dec",
    "Add Money": 355,
    "Send Money": 380,
    "Withdraw Money": 530,
  },
  {
    name: "17 Dec",
    "Add Money": 280,
    "Send Money": 260,
    "Withdraw Money": 480,
  },
  {
    name: "18 Dec",
    "Add Money": 420,
    "Send Money": 310,
    "Withdraw Money": 590,
  },
  {
    name: "19 Dec",
    "Add Money": 315,
    "Send Money": 440,
    "Withdraw Money": 560,
  },
  {
    name: "20 Dec",
    "Add Money": 390,
    "Send Money": 330,
    "Withdraw Money": 620,
  },
];

const colors = [
  "#4F46E5",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
  "#F97316",
];
// #endregion
const BrushBarChart = () => {
  const bars = Object.keys(data[0])?.filter((item) => item !== "name");
  return (
    <BarChart
      style={{
        width: "100%",
        // maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
      <ReferenceLine y={0} stroke="#000" />
      {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
      {/* <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" /> */}
      {bars.map((item, idx) => (
        <Bar key={idx} dataKey={item} fill={colors[idx]} />
      ))}
    </BarChart>
  );
};

export default BrushBarChart;
