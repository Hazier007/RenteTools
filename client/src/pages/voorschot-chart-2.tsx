import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface VoorschotChart2Props {
  data: any[];
}

export default function VoorschotChart2({ data }: VoorschotChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="maand" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`€${Math.round(value)}`]} />
        <Bar dataKey="rente" stackId="a" fill="#8884d8" name="Rente" />
        <Bar dataKey="aflossing" stackId="a" fill="#82ca9d" name="Aflossing" />
      </BarChart>
    </ResponsiveContainer>
  );
}
