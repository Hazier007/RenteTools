import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface RentevoetChart1Props {
  data: any[];
}

export default function RentevoetChart1({ data }: RentevoetChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `${value.toFixed(2)}%`,
            name === 'vasteRente' ? 'Vaste rente' : 'Variabele rente'
          ]}
        />
        <Line type="monotone" dataKey="vasteRente" stroke="#8884d8" name="vasteRente" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="variabeleRente" stroke="#82ca9d" name="variabeleRente" />
      </LineChart>
    </ResponsiveContainer>
  );
}
