import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface EindejaarsbonusChart1Props {
  data: any[];
}

export default function EindejaarsbonusChart1({ data }: EindejaarsbonusChart1Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jaar" />
        <YAxis />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `€${value.toLocaleString()}`,
            name === 'waarde' ? 'Totale waarde' : name === 'winst' ? 'Winst' : 'Start bedrag'
          ]}
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
          dataKey="startBedrag" 
          stroke="#64748b" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="startBedrag"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
