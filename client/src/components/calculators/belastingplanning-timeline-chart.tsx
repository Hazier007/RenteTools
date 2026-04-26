import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface BelastingplanningTimelineChartProps {
  data: any[];
}

export default function BelastingplanningTimelineChart({ data }: BelastingplanningTimelineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
        <Tooltip formatter={(value, name) => [
          formatCurrency(Number(value)),
          name === 'currentScenario' ? 'Huidige Scenario' :
          name === 'optimizedScenario' ? 'Geoptimaliseerd Scenario' :
          'Cumulatieve Besparingen'
        ]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="currentScenario"
          stroke="#ef4444"
          name="Huidige Scenario"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="optimizedScenario"
          stroke="#10b981"
          name="Geoptimaliseerd Scenario"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="cumulativeSavings"
          stroke="#3b82f6"
          name="Cumulatieve Besparingen"
          strokeWidth={3}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
