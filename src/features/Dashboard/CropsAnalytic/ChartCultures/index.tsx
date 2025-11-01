"use client";

import { theme } from "@/styles/theme";
import { ResponsiveContainer, Treemap } from "recharts";

const data = [
  {
    name: "Group A",
    children: [
      { name: "A1", size: 100 },
      { name: "A2", size: 300 },
      { name: "A3", size: 200 },
    ],
  },
  {
    name: "Group B",
    children: [
      { name: "B1", size: 400 },
      { name: "B2", size: 120 },
    ],
  },
  {
    name: "Group C",
    children: [
      { name: "C1", size: 180 },
      { name: "C2", size: 90 },
      { name: "C3", size: 50 },
    ],
  },
];

function CustomTreemapContent(props: any) {
  const { depth, x, y, width, height, name } = props;
  const bg = depth % 2 === 0 ?  theme.colors.PRIMARY_LIGHT: theme.colors.PRIMARY_DARK;
  const isTooSmall = width < 60 || height < 24;

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} stroke="#fff" fill={bg} />
      {!isTooSmall && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: 12 }}
        >
          {name}
        </text>
      )}
    </g>
  );
}

export default function ChartCultures({
  data,
}: {
  data: Array<{ name: string; value: number }>;
}) {
  return (
    <ResponsiveContainer>
      <Treemap
        data={data}
        dataKey="size"
        stroke="#fff"
        content={<CustomTreemapContent />}
      />
    </ResponsiveContainer>
  );
}
