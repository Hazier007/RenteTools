import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface LoyaltyBonusChart2Props {
  data: any[];
}

export default function LoyaltyBonusChart2({ data }: LoyaltyBonusChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="naam" type="category" width={80} />
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Totale rente']}
        />
        <Bar dataKey="totaleRente" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  );
}
