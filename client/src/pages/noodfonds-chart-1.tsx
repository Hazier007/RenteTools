import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface NoodfondsChart1Props {
  data: any[];
}

export default function NoodfondsChart1({ data }: NoodfondsChart1Props) {
  const filtered = data.filter((item: any) => item.bedrag > 0);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={filtered}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          dataKey="bedrag"
        >
          {filtered.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
      </PieChart>
    </ResponsiveContainer>
  );
}
