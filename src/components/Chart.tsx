
import { Cell, PieChart, Pie, Tooltip, TooltipProps } from "recharts";
import { categoryColors } from "../constants/colors";
import React from "react";

type FixedChartProps = {
  data: {
    category_id: number;
    total_time: number;
  }[];
}
export const FixedChart = React.memo(({ data }: FixedChartProps) => {
  if (!data || data.length === 0) {
    return <p>データを読み込んでいます...</p>;
  }

  // ツールチップのカスタマイズ
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      const category = categoryColors[entry.payload.category_id];
      return (
        <div style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #ccc" }}>
          <p style={{ margin: 0 }}>
            <strong>{category.label}:</strong> {entry.value}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="total_time"
        nameKey="category_id"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="8884d8"
      >

        {data.map((entry) => {
          return (
            <Cell
              key={`cell-${entry.category_id}`}
              fill={categoryColors[entry.category_id].color} />
          );
        })}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  )
});