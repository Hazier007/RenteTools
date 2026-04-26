import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface SchuldenconsolidatieChart3Props {
  data: any[];
}

export default function SchuldenconsolidatieChart3({ data }: SchuldenconsolidatieChart3Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="maand" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `€${Math.round(value)}`,
            name === 'huidig' ? 'Huidige situatie' : name === 'nieuw' ? 'Na consolidatie' : 'Besparing'
          ]}
        />
        <Line type="monotone" dataKey="huidig" stroke="#8884d8" name="huidig" />
        <Line type="monotone" dataKey="nieuw" stroke="#82ca9d" name="nieuw" />
      </LineChart>
    </ResponsiveContainer>
  );
}
