import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface KredietcapaciteitPieChartProps {
  data: any[];
}

export default function KredietcapaciteitPieChart({ data }: KredietcapaciteitPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
