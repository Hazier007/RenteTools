import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface DoelspaarTimelineChartProps {
  data: any[];
}

export default function DoelspaarTimelineChart({ data }: DoelspaarTimelineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
        <Tooltip formatter={(value, name) => [
          name === 'totalSaved' ? formatCurrency(Number(value)) : value,
          name === 'totalSaved' ? 'Totaal Gespaard' :
          name === 'completedGoals' ? 'Voltooide Doelen' : 'Resterende Doelen'
        ]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalSaved"
          stroke="#8884d8"
          name="Totaal Gespaard"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="completedGoals"
          stroke="#82ca9d"
          name="Voltooide Doelen"
          strokeWidth={2}
          yAxisId="right"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
