import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface LeasingkredietChart3Props {
  data: any[];
}

export default function LeasingkredietChart3({ data }: LeasingkredietChart3Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="maand" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `€${Math.round(value)}`, 
            name === 'financial' ? 'Financial' : name === 'operational' ? 'Operational' : 'Verschil'
          ]}
        />
        <Line type="monotone" dataKey="financial" stroke="#8884d8" name="financial" />
        <Line type="monotone" dataKey="operational" stroke="#82ca9d" name="operational" />
      </LineChart>
    </ResponsiveContainer>
  );
}
