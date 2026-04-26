import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface BudgetBarChartProps {
  data: any[];
}

export default function BudgetBarChart({ data }: BudgetBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} />
        <Tooltip
          formatter={(value, name) => [
            name === 'amount' ? formatCurrency(Number(value)) : `${Number(value).toFixed(1)}%`,
            name === 'amount' ? 'Bedrag' : 'Percentage van inkomen'
          ]}
        />
        <Bar dataKey="percentage" fill="#3b82f6" name="Percentage" />
      </BarChart>
    </ResponsiveContainer>
  );
}
