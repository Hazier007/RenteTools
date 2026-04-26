import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface ReitChart3Props {
  data: Record<string, number>;
}

export default function ReitChart3({ data }: ReitChart3Props) {
  const pieData = Object.entries(data).map(([sector, percentage]) => ({
    name: sector,
    value: percentage,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name} ${value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`${value}%`]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
