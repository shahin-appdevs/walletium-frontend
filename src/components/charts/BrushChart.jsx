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
  Brush,
} from "recharts";

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
//   {
//     name: "03 Dec",
//     "Add Money": 210,
//     "Send Money": 340,
//     "Withdraw Money": 480,
//   },
//   {
//     name: "04 Dec",
//     "Add Money": 390,
//     "Send Money": 290,
//     "Withdraw Money": 520,
//   },
//   {
//     name: "05 Dec",
//     "Add Money": 260,
//     "Send Money": 410,
//     "Withdraw Money": 450,
//   },
//   {
//     name: "06 Dec",
//     "Add Money": 320,
//     "Send Money": 280,
//     "Withdraw Money": 570,
//   },
//   {
//     name: "07 Dec",
//     "Add Money": 275,
//     "Send Money": 360,
//     "Withdraw Money": 610,
//   },
//   {
//     name: "08 Dec",
//     "Add Money": 350,
//     "Send Money": 420,
//     "Withdraw Money": 490,
//   },
//   {
//     name: "09 Dec",
//     "Add Money": 295,
//     "Send Money": 310,
//     "Withdraw Money": 530,
//   },
//   {
//     name: "10 Dec",
//     "Add Money": 330,
//     "Send Money": 260,
//     "Withdraw Money": 580,
//   },
//   {
//     name: "11 Dec",
//     "Add Money": 360,
//     "Send Money": 300,
//     "Withdraw Money": 540,
//   },
//   {
//     name: "12 Dec",
//     "Add Money": 250,
//     "Send Money": 390,
//     "Withdraw Money": 620,
//   },
//   {
//     name: "13 Dec",
//     "Add Money": 410,
//     "Send Money": 280,
//     "Withdraw Money": 500,
//   },
//   {
//     name: "14 Dec",
//     "Add Money": 270,
//     "Send Money": 340,
//     "Withdraw Money": 560,
//   },
//   {
//     name: "15 Dec",
//     "Add Money": 305,
//     "Send Money": 420,
//     "Withdraw Money": 610,
//   },
//   {
//     name: "16 Dec",
//     "Add Money": 355,
//     "Send Money": 380,
//     "Withdraw Money": 530,
//   },
//   {
//     name: "17 Dec",
//     "Add Money": 280,
//     "Send Money": 260,
//     "Withdraw Money": 480,
//   },
//   {
//     name: "18 Dec",
//     "Add Money": 420,
//     "Send Money": 310,
//     "Withdraw Money": 590,
//   },
//   {
//     name: "19 Dec",
//     "Add Money": 315,
//     "Send Money": 440,
//     "Withdraw Money": 560,
//   },
//   {
//     name: "20 Dec",
//     "Add Money": 390,
//     "Send Money": 330,
//     "Withdraw Money": 620,
//   },
// ];

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
const BrushBarChart = ({ data }) => {
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
      <Brush dataKey="name" height={30} stroke="#8884d8" />
      {/* <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" /> */}
      {bars.map((item, idx) => (
        <Bar key={idx} dataKey={item} fill={colors[idx]} />
      ))}
    </BarChart>
  );
};

export default BrushBarChart;
