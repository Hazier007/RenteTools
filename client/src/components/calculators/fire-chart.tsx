import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface FireChartProps {
  data: any[];
}

export default function FireChart({ data }: FireChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" />
        <YAxis yAxisId="left" tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
        <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value.toFixed(0)}%`} />
        <Tooltip formatter={(value, name) => [
          name === 'netWorth' || name === 'annualIncome' ? formatCurrency(Number(value)) : `${Number(value).toFixed(1)}%`,
          name === 'netWorth' ? 'Net Vermogen' :
          name === 'annualIncome' ? 'Jaarlijks Inkomen' : 'FIRE Voortgang'
        ]} />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="netWorth"
          stroke="#8884d8"
          name="Net Vermogen"
          strokeWidth={2}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="annualIncome"
          stroke="#82ca9d"
          name="FIRE Inkomen"
          strokeWidth={2}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="fireProgress"
          stroke="#ff7300"
          name="FIRE Voortgang (%)"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
