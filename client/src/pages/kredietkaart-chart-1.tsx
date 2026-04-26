import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface KredietkaartChart1Props {
  data: any[];
}

export default function KredietkaartChart1({ data }: KredietkaartChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="scenario" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            name === 'maanden' ? `${Math.floor(value / 12)}j ${value % 12}m` : `€${Math.round(value).toLocaleString()}`,
            name === 'maanden' ? 'Tijd' : 'Totale kosten'
          ]}
        />
        <Bar dataKey="totaleKosten" fill="#ef4444" name="totaleKosten" />
      </BarChart>
    </ResponsiveContainer>
  );
}
