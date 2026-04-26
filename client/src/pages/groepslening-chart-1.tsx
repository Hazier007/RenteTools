import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


interface GroepsleningChart1Props {
  data: any[];
}

export default function GroepsleningChart1({ data }: GroepsleningChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ naam, aandeel }) => `${naam}: ${aandeel.toFixed(1)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="aandeel"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
