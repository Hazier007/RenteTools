import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface SamengesteldeRenteChartProps {
  data: any[];
}

export default function SamengesteldeRenteChart({ data }: SamengesteldeRenteChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => [
            formatCurrency(value as number),
            name === "samengesteld" ? "Samengesteld" : "Enkelvoudig"
          ]}
          labelFormatter={(label) => `Jaar ${label}`}
        />
        <Line
          type="monotone"
          dataKey="samengesteld"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
          name="samengesteld"
        />
        <Line
          type="monotone"
          dataKey="enkelvoudig"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="enkelvoudig"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
