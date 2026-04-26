import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface KredietkaartChart2Props {
  data: any[];
}

export default function KredietkaartChart2({ data }: KredietkaartChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`, '']}
          labelFormatter={(jaar) => `Jaar ${jaar}`}
        />
        <Line 
          type="monotone" 
          dataKey="restschuld" 
          stroke="#ef4444" 
          strokeWidth={2}
          name="Restschuld"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
