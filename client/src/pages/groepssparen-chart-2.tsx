import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface GroepssparenChart2Props {
  data: any[];
}

export default function GroepssparenChart2({ data }: GroepssparenChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="grootte" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `€${value.toLocaleString()}`,
            name === 'perPersoon' ? 'Per persoon' : 'Winst per persoon'
          ]}
        />
        <Bar dataKey="perPersoon" fill="#3b82f6" name="perPersoon" />
        <Bar dataKey="winstPerPersoon" fill="#22c55e" name="winstPerPersoon" />
      </BarChart>
    </ResponsiveContainer>
  );
}
