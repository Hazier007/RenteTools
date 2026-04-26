import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface ObligatieChart2Props {
  data: any[];
}

export default function ObligatieChart2({ data }: ObligatieChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="renteverandering" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Prijsverandering']}
          labelFormatter={(label) => `Renteverandering: ${label}%`}
        />
        <Bar dataKey="prijsVeranderingPercentage" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
