import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface GroepsleningChart2Props {
  data: any[];
}

export default function GroepsleningChart2({ data }: GroepsleningChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="naam" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            name === 'schuldRatio' ? `${value.toFixed(1)}%` : `€${Math.round(value).toLocaleString()}`,
            name === 'schuldRatio' ? 'Schuldgraad' : 'Inkomen'
          ]}
        />
        <Bar dataKey="schuldRatio" fill="#8884d8" name="schuldRatio" />
      </BarChart>
    </ResponsiveContainer>
  );
}
