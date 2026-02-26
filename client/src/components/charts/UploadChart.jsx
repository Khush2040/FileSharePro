import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", uploads: 4 },
  { day: "Tue", uploads: 6 },
  { day: "Wed", uploads: 3 },
  { day: "Thu", uploads: 8 },
  { day: "Fri", uploads: 5 },
];

export default function UploadChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="uploads"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}