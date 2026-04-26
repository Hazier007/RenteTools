import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface DoorlopendKredietChart2Props {
  data: any[];
}

export default function DoorlopendKredietChart2({ data }: DoorlopendKredietChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="item" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]}
        />
        <Bar dataKey="jaarlijks" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
