"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Category, StatsPoint } from "@/lib/routines/types";

const OVERALL_COLOR = "#64748b";
const OVERALL_LABEL = "全体";

export default function StatsChart({
  points,
  categories,
}: {
  points: StatsPoint[];
  categories: Category[];
}) {
  const data = points.map((point) => ({
    date: point.date,
    [OVERALL_LABEL]: point.overall,
    ...Object.fromEntries(
      categories.map((c) => [c.name, point.categories[c.name] ?? null]),
    ),
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            opacity={0.15}
          />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} minTickGap={16} />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11 }}
            unit="%"
            width={40}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={OVERALL_LABEL}
            stroke={OVERALL_COLOR}
            strokeWidth={2}
            dot={{ r: 3 }}
            connectNulls={false}
          />
          {categories.map((category) => (
            <Line
              key={category.name}
              type="monotone"
              dataKey={category.name}
              stroke={category.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
