import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface TermijnrekeningChart2Props {
  data: any[];
}

export default function TermijnrekeningChart2({ data }: TermijnrekeningChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Gemiddelde rente']}
        />
        <Line 
          type="monotone" 
          dataKey="rente" 
          stroke="#2563eb" 
          strokeWidth={2}
          name="rente"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
