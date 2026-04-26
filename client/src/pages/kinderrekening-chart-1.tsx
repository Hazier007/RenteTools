import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface KinderrekeningChart1Props {
  data: any[];
}

export default function KinderrekeningChart1({ data }: KinderrekeningChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
          labelFormatter={(jaar) => `Leeftijd: ${jaar} jaar`}
        />
        <Line 
          type="monotone" 
          dataKey="waarde" 
          stroke="#2563eb" 
          strokeWidth={2}
          name="Totale waarde"
        />
        <Line 
          type="monotone" 
          dataKey="ingelegd" 
          stroke="#64748b" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Totaal ingelegd"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
