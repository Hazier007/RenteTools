import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface CryptocurrencyChart2Props {
  data: any[];
}

export default function CryptocurrencyChart2({ data }: CryptocurrencyChart2Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="periode" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip 
          formatter={(value: number, name: string) => [
            name === 'portfolioWaarde' ? `€${Math.round(value).toLocaleString()}` : 
            name === 'btcKoers' ? `€${Math.round(value).toLocaleString()}` :
            `${value.toFixed(1)}%`,
            name === 'portfolioWaarde' ? 'Portfolio Waarde' :
            name === 'btcKoers' ? 'Bitcoin Koers' :
            name === 'rendement' ? 'Rendement' : name
          ]}
          labelFormatter={(label) => `Maand ${label}`}
        />
        <Area yAxisId="left" type="monotone" dataKey="portfolioWaarde" fill="#8884d8" fillOpacity={0.3} />
        <Line yAxisId="right" type="monotone" dataKey="btcKoers" stroke="#F7931A" strokeWidth={2} />
        <Line yAxisId="right" type="monotone" dataKey="rendement" stroke="#82ca9d" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
