import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface WoningkredietChart1Props {
  data: any[];
}

export default function WoningkredietChart1({ data }: WoningkredietChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="naam" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `€${Math.round(value).toLocaleString()}`, 
            name === 'maandlast' ? 'Maandlast' : 'Totale Rente'
          ]}
        />
        <Bar dataKey="maandlast" fill="#8884d8" name="maandlast" />
        <Bar dataKey="totaalRente" fill="#82ca9d" name="totaalRente" />
      </BarChart>
    </ResponsiveContainer>
  );
}
