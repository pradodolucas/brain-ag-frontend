"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "X", value: 240 },
  { name: "Y", value: 456 },
  { name: "Z", value: 139 },
  { name: "W", value: 980 },
];

const COLORS = [
  "#197278", "#b2967d", "#3a7d52", "#d4a574", "#2d8e94",
  "#9c8068", "#5da175", "#e8c97e", "#4ba8ad", "#c8b09a",
  "#82c19a", "#c45c5c", "#6fc2c7", "#dfcdbd", "#4b8c3a",
  "#e9a557", "#114a4e", "#a58a72", "#6bac5d", "#8db452",
  "#238287", "#d4bcab", "#2d6b3d", "#a3dbb5", "#57b5ba",
  "#ebddd2", "#90d4a8", "#8e735c", "#79b46c", "#89d5d9",
  "#bfaa95", "#568f49", "#a8e6ea", "#f1e6dc", "#1a5d63"
];

export default function ChartStates({
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
          cy="50%"
          innerRadius={100}
          outerRadius={140}
          paddingAngle={1}
          strokeWidth={1}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
              stroke="#1f2937"
              strokeWidth={0}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
