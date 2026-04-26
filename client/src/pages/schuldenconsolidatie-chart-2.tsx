import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface SchuldenconsolidatieChart2Props {
  data: any[];
}

export default function SchuldenconsolidatieChart2({ data }: SchuldenconsolidatieChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="aspect" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
        <Bar dataKey="huidig" fill="#8884d8" name="Huidige situatie" />
        <Bar dataKey="nieuw" fill="#82ca9d" name="Na consolidatie" />
      </BarChart>
    </ResponsiveContainer>
  );
}
