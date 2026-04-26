import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


interface EtfChart3Props {
  data: any[];
}

export default function EtfChart3({ data }: EtfChart3Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ sector, percentage }) => `${sector} ${percentage}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="percentage"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`${value}%`]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
