"use client";

import { theme } from "@/styles/theme";
import { ResponsiveContainer, Treemap, Tooltip } from "recharts";

function CustomTreemapContent(props: any) {
  const { depth, x, y, width, height, name, value, index, payload, colors, onMouseEnter, onMouseLeave } = props;
  const bg = depth % 2 === 0 ? theme.colors.PRIMARY_LIGHT : theme.colors.PRIMARY_DARK;
  const isTooSmall = width < 60 || height < 24;

  return (
    <g
      onMouseEnter={(e) => onMouseEnter && onMouseEnter({ x, y, width, height, name, value, payload, index }, e)}
      onMouseLeave={(e) => onMouseLeave && onMouseLeave(e)}
    >
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
    <ResponsiveContainer width="100%">
      <Treemap
        data={data}
        dataKey="value"
        stroke="#fff"
        content={<CustomTreemapContent />}
      >
        <Tooltip
          formatter={(value: number, name: string, props: any) => [`${value}`, `${name}`]}
        />
      </Treemap>
    </ResponsiveContainer>
  );
}
