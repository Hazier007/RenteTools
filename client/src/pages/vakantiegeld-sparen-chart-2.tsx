import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface VakantiegeldSparenChart2Props {
  data: any[];
}

export default function VakantiegeldSparenChart2({ data }: VakantiegeldSparenChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="naam" angle={-45} textAnchor="end" height={100} fontSize={10} />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`, 'Waarde na 5 jaar']}
        />
        <Bar dataKey="na5jaar" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
}
