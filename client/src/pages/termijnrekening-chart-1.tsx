import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface TermijnrekeningChart1Props {
  data: any[];
}

export default function TermijnrekeningChart1({ data }: TermijnrekeningChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="looptijd" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `€${Math.round(value).toLocaleString()}`,
            name === 'rendement' ? 'Rendement' : 'Eindwaarde'
          ]}
        />
        <Bar dataKey="rendement" fill="#22c55e" name="rendement" />
      </BarChart>
    </ResponsiveContainer>
  );
}
