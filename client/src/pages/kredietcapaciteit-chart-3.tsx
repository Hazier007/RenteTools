import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface KredietcapaciteitChart3Props {
  data: any[];
}

export default function KredietcapaciteitChart3({ data }: KredietcapaciteitChart3Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            name === 'limiet' ? `€${Math.round(value).toLocaleString()}` : `${value}%`,
            name === 'limiet' ? 'Max bedrag' : 'Typische rente'
          ]}
        />
        <Bar dataKey="limiet" fill="#8884d8" name="limiet" />
      </BarChart>
    </ResponsiveContainer>
  );
}
