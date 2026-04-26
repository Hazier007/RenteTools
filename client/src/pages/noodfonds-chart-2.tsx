import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface NoodfondsChart2Props {
  data: any[];
}

export default function NoodfondsChart2({ data }: NoodfondsChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="scenario" type="category" width={100} />
        <Tooltip 
          formatter={(value: number) => [`€${value.toLocaleString()}`, 'Bedrag']}
        />
        <Bar dataKey="bedrag" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
