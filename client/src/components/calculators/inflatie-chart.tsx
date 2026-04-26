import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface InflatieChartProps {
  data: any[];
}

export default function InflatieChart({ data }: InflatieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => [
            formatCurrency(value as number),
            name === "waarde" ? "Nominale Waarde" : "Huidige Koopkracht"
          ]}
          labelFormatter={(label) => `Jaar ${label}`}
        />
        <Line
          type="monotone"
          dataKey="waarde"
          stroke="hsl(var(--destructive))"
          strokeWidth={2}
          name="waarde"
        />
        <Line
          type="monotone"
          dataKey="koopkracht"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="koopkracht"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
