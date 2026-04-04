"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Data = {
  month: string;
  amount: number;
};

export default function MonthlyTrendChart({ data }: { data: Data[] }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow w-full h-[300px]">
      <h2 className="text-lg font-semibold mb-2">Monthly Spending</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}