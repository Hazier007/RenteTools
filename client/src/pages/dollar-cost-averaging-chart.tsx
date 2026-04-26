import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DollarCostAveragingChartProps {
  data: any[];
}

export default function DollarCostAveragingChart({ data }: DollarCostAveragingChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="maand" />
        <YAxis />
        <Tooltip
          formatter={(value: number, name: string) => [
            `€${Math.round(value).toLocaleString()}`,
            name === 'dcaWaarde' ? 'DCA Portfolio' :
            name === 'lumpSumWaarde' ? 'Lump Sum Portfolio' :
            name === 'dcaGeïnvesteerd' ? 'DCA Geïnvesteerd' : name
          ]}
          labelFormatter={(label) => `Maand ${label}`}
        />
        <Area type="monotone" dataKey="dcaGeïnvesteerd" fill="#e0e7ff" stroke="#6366f1" strokeWidth={1} fillOpacity={0.3} />
        <Line type="monotone" dataKey="dcaWaarde" stroke="#3b82f6" strokeWidth={2} name="DCA Portfolio" />
        <Line type="monotone" dataKey="lumpSumWaarde" stroke="#8b5cf6" strokeWidth={2} name="Lump Sum Portfolio" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
