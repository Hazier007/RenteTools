import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


interface SchuldenconsolidatieChart1Props {
  data: any[];
}

export default function SchuldenconsolidatieChart1({ data }: SchuldenconsolidatieChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ naam, bedrag }) => `${naam}: €${Math.round(bedrag).toLocaleString()}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="bedrag"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
