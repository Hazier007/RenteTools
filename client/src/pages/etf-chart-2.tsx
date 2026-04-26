import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface EtfChart2Props {
  data: any[];
}

export default function EtfChart2({ data }: EtfChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="etf" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            name === 'ter' ? `${value}%` : `€${Math.round(value).toLocaleString()}`,
            name === 'ter' ? 'TER' : 'Jaarlijkse kosten'
          ]}
        />
        <Bar dataKey="jaarlijkseKosten" fill="#8884d8" name="jaarlijkseKosten" />
      </BarChart>
    </ResponsiveContainer>
  );
}
