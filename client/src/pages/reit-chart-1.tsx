import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ReitChart1Props {
  data: any[];
  dividendHerbelegging: boolean;
}

export default function ReitChart1({ data, dividendHerbelegging }: ReitChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
        <Area type="monotone" dataKey="portfolioWaarde" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        {!dividendHerbelegging && (
          <Area type="monotone" dataKey="cumulatiefDividend" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
