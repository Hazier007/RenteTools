import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface PensioenScenariosChartProps {
  data: any[];
}

export default function PensioenScenariosChart({ data }: PensioenScenariosChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
        <Legend />
        <Line
          type="monotone"
          dataKey="spaardoel"
          stroke="#8884d8"
          name="Benodigd Spaardoel"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="werkelijk"
          stroke="#82ca9d"
          name="Huidige Opbouw"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="tekort"
          stroke="#ff7300"
          name="Tekort"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
