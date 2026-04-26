import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface LeasingkredietChart1Props {
  data: any[];
}

export default function LeasingkredietChart1({ data }: LeasingkredietChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="aspect" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
        <Bar dataKey="financial" fill="#8884d8" name="Financial Leasing" />
        <Bar dataKey="operational" fill="#82ca9d" name="Operational Leasing" />
      </BarChart>
    </ResponsiveContainer>
  );
}
