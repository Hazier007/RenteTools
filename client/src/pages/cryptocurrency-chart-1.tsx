import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


interface CryptocurrencyChart1Props {
  data: any[];
}

export default function CryptocurrencyChart1({ data }: CryptocurrencyChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ symbol, allocatie }) => `${symbol} ${allocatie}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="allocatie"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.kleur} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`${value}%`]} />
      </PieChart>
    </ResponsiveContainer>
  );
}
