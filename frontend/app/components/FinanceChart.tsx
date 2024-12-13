"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "January",
    income: 2300,
    expense: 2500,
  },
  {
    name: "February",
    income: 2100,
    expense: 1650,
  },
  {
    name: "March",
    income: 2800,
    expense: 3100,
  },
  {
    name: "April",
    income: 2450,
    expense: 1950,
  },
  {
    name: "May",
    income: 3100,
    expense: 2300,
  },
  {
    name: "June",
    income: 2900,
    expense: 3200,
  },
  {
    name: "July",
    income: 3300,
    expense: 2600,
  },
  {
    name: "August",
    income: 3200,
    expense: 2500,
  },
  {
    name: "September",
    income: 2700,
    expense: 2900,
  },
  {
    name: "October",
    income: 2950,
    expense: 2350,
  },
  {
    name: "November",
    income: 3400,
    expense: 2700,
  },
  {
    name: "December",
    income: 3800,
    expense: 3100,
  },
];

export default function FinanceChart() {
  return (
    <div className="rounded-xl bg-white w-full h-full p-4">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Finance</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#d1d5db" }}
            tickFormatter={(value) => value.slice(0, 3)}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#d1d5db" }}
            tickFormatter={(value) => `$${value}`}
            tickMargin={15}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: 10, paddingBottom: 15 }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#c3ebfa"
            strokeWidth={4}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#cfceff"
            strokeWidth={4}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
