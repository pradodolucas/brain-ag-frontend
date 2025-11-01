"use client";

import { theme } from "@/styles/theme";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

const COLORS = [theme.colors.SECONDARY, theme.colors.PRIMARY];

export default function ChartAreaDivider({
  data,
}: {
  data: Array<{ name: string; value: number }>;
}) {
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={100}
          outerRadius={150}
          cornerRadius={16}
          paddingAngle={2}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
