import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface WoningkredietChart3Props {
  data: any[];
}

export default function WoningkredietChart3({ data }: WoningkredietChart3Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]}
        />
        <Line type="monotone" dataKey="rente" stroke="#8884d8" name="Rente" />
        <Line type="monotone" dataKey="aflossing" stroke="#82ca9d" name="Aflossing" />
        <Line type="monotone" dataKey="restSchuld" stroke="#ffc658" name="Restschuld" />
      </LineChart>
    </ResponsiveContainer>
  );
}
