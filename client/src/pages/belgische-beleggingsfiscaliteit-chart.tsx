import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BelgischeBeleggingsfiscaliteitChartProps {
  data: any[];
}

export default function BelgischeBeleggingsfiscaliteitChart({ data }: BelgischeBeleggingsfiscaliteitChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="naam" angle={-45} textAnchor="end" height={80} />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip
          formatter={(value: number, name: string) => [
            name === 'rate' ? `${value.toFixed(1)}%` : `€${Math.round(value).toLocaleString()}`,
            name === 'bruto' ? 'Bruto Dividend' :
            name === 'belasting' ? 'Belasting' :
            name === 'netto' ? 'Netto Dividend' :
            name === 'rate' ? 'Belastingtarief' : name
          ]}
        />
        <Bar yAxisId="left" dataKey="bruto" fill="#3b82f6" />
        <Bar yAxisId="left" dataKey="belasting" fill="#ef4444" />
        <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
