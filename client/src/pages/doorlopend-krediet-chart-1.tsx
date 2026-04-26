import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface DoorlopendKredietChart1Props {
  data: any[];
}

export default function DoorlopendKredietChart1({ data }: DoorlopendKredietChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="maand" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `€${Math.round(value).toLocaleString()}`,
            name === 'restSchuld' ? 'Restschuld' : 'Beschikbaar'
          ]}
        />
        <Area type="monotone" dataKey="restSchuld" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="beschikbaar" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
