import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface RentevoetChart3Props {
  data: any[];
}

export default function RentevoetChart3({ data }: RentevoetChart3Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`€${Math.round(value)}`]} />
        <Line type="monotone" dataKey="vasteMaandlast" stroke="#8884d8" name="Vaste maandlast" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="variabeleMaandlast" stroke="#82ca9d" name="Variabele maandlast" />
      </LineChart>
    </ResponsiveContainer>
  );
}
