import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface RentevoetChart4Props {
  data: any[];
}

export default function RentevoetChart4({ data }: RentevoetChart4Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="scenario" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
        <Bar dataKey="vasteTotaal" fill="#8884d8" name="Vaste rente totaal" />
        <Bar dataKey="variabeleTotaal" fill="#82ca9d" name="Variabele rente totaal" />
      </BarChart>
    </ResponsiveContainer>
  );
}
