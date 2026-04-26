import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface GroepssparenChart1Props {
  data: any[];
}

export default function GroepssparenChart1({ data }: GroepssparenChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="maand" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `€${value.toLocaleString()}`,
            name === 'bedrag' ? 'Gespaard bedrag' : 'Doel'
          ]}
          labelFormatter={(maand) => `Maand ${maand}`}
        />
        <Line 
          type="monotone" 
          dataKey="bedrag" 
          stroke="#22c55e" 
          strokeWidth={2}
          name="bedrag"
        />
        <Line 
          type="monotone" 
          dataKey="doel" 
          stroke="#ef4444" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="doel"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
