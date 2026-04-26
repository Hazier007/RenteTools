import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface LoyaltyBonusChart1Props {
  data: any[];
  huidigeBank: string;
  nieuweBank: string;
}

export default function LoyaltyBonusChart1({ data, huidigeBank, nieuweBank }: LoyaltyBonusChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip
          formatter={(value: number, name: string) => [
            `€${value.toLocaleString()}`,
            name === 'huidigeBank' ? huidigeBank : nieuweBank
          ]}
        />
        <Line
          type="monotone"
          dataKey="huidigeBank"
          stroke="#3b82f6"
          strokeWidth={2}
          name="huidigeBank"
        />
        <Line
          type="monotone"
          dataKey="nieuweBank"
          stroke="#22c55e"
          strokeWidth={2}
          name="nieuweBank"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
