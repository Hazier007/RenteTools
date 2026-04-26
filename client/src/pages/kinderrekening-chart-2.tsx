import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


interface KinderrekeningChart2Props {
  data: any[];
}

export default function KinderrekeningChart2({ data }: KinderrekeningChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={70}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `€${Math.round(value).toLocaleString()}`} />
      </PieChart>
    </ResponsiveContainer>
  );
}
