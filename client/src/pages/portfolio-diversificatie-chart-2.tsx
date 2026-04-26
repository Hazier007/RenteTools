import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface PortfolioDiversificatieChart2Props {
  data: any[];
}

export default function PortfolioDiversificatieChart2({ data }: PortfolioDiversificatieChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
        <Area type="monotone" dataKey="conservatief" stackId="1" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} />
        <Area type="monotone" dataKey="verwacht" stackId="2" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Area type="monotone" dataKey="optimistisch" stackId="3" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
