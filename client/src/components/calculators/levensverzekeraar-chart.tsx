import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface LevensverzekeraarChartProps {
  data: any[];
}

export default function LevensverzekeraarChart({ data }: LevensverzekeraarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" />
        <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
        <Tooltip formatter={(value, name) => [
          formatCurrency(Number(value)),
          name === 'wholeLifeCashValue' ? 'Hele Leven Cash Waarde' :
          name === 'termInvestmentValue' ? 'Term + Beleggen Waarde' :
          name === 'wholeLifeDeathBenefit' ? 'Hele Leven Uitkering' : 'Term + Beleggen Uitkering'
        ]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="wholeLifeCashValue"
          stroke="#3b82f6"
          name="Hele Leven Cash Waarde"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="termInvestmentValue"
          stroke="#10b981"
          name="Term + Beleggen Waarde"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="wholeLifeDeathBenefit"
          stroke="#3b82f6"
          strokeDasharray="5 5"
          name="Hele Leven Uitkering"
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="termDeathBenefit"
          stroke="#10b981"
          strokeDasharray="5 5"
          name="Term + Beleggen Uitkering"
          strokeWidth={1}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
