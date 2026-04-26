import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface StakingApyChartProps {
  data: any[];
}

export default function StakingApyChart({ data }: StakingApyChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="dag"
          tickFormatter={(v) => `${v}d`}
        />
        <YAxis
          tickFormatter={(v) => `€${v.toFixed(0)}`}
        />
        <Tooltip
          formatter={(value) => [formatCurrency(value as number), "Waarde"]}
          labelFormatter={(label) => `Dag ${label}`}
        />
        <Line
          type="monotone"
          dataKey="waarde"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
