import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StudieschuldChartProps {
  data: any[];
}

export default function StudieschuldChart({ data }: StudieschuldChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`, '']}
          labelFormatter={(jaar) => `Jaar ${jaar}`}
        />
        <Line
          type="monotone"
          dataKey="restschuld"
          stroke="#ef4444"
          strokeWidth={2}
          name="Restschuld"
        />
        <Line
          type="monotone"
          dataKey="afgbetaald"
          stroke="#22c55e"
          strokeWidth={2}
          name="Afbetaald"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
