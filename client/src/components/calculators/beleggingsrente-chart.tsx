import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface BeleggingsrenteChartProps {
  data: any[];
}

export default function BeleggingsrenteChart({ data }: BeleggingsrenteChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip
          formatter={(value) => [formatCurrency(value as number), "Waarde"]}
          labelFormatter={(label) => `Jaar ${label}`}
        />
        <Line
          type="monotone"
          dataKey="eindsaldo"
          stroke="hsl(var(--accent))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
