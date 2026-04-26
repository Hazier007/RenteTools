import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface ReitChart2Props {
  data: any[];
}

export default function ReitChart2({ data }: ReitChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rente" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Impact op REIT prijs']}
          labelFormatter={(label) => `Rente: ${label}%`}
        />
        <Bar dataKey="verwachtImpact" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
