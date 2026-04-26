import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface EtfChart1Props {
  data: any[];
}

export default function EtfChart1({ data }: EtfChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
        <Area type="monotone" dataKey="gestortBedrag" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Area type="monotone" dataKey="nettoRendement" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
