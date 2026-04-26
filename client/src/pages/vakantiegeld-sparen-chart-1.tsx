import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface VakantiegeldSparenChart1Props {
  data: any[];
  doelKosten: number;
}

export default function VakantiegeldSparenChart1({ data, doelKosten }: VakantiegeldSparenChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [`€${value.toLocaleString()}`, 'Totale waarde']}
          labelFormatter={(jaar) => `Na ${jaar} jaar`}
        />
        <Line
          type="monotone"
          dataKey="waarde"
          stroke="#22c55e"
          strokeWidth={2}
          name="waarde"
        />
        <Line
          type="monotone"
          dataKey={() => doelKosten}
          stroke="#ef4444"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="doel"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
