import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface KredietcapaciteitChart4Props {
  data: any[];
}

export default function KredietcapaciteitChart4({ data }: KredietcapaciteitChart4Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="looptijd" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]}
        />
        <Line type="monotone" dataKey="totaalBedrag" stroke="#8884d8" name="Kredietbedrag" />
      </LineChart>
    </ResponsiveContainer>
  );
}
