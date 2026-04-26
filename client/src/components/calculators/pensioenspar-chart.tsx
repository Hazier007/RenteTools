import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface PensioensparChartProps {
  data: any[];
}

export default function PensioensparChart({ data }: PensioensparChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip
          formatter={(value) => [formatCurrency(value as number), "Waarde"]}
          labelFormatter={(label) => `Leeftijd ${label}`}
        />
        <Line
          type="monotone"
          dataKey="eindsaldo"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
