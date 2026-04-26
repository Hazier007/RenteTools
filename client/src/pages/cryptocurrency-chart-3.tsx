import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

interface CryptocurrencyChart3Props {
  data: any[];
}

export default function CryptocurrencyChart3({ data }: CryptocurrencyChart3Props) {
  const radarData = data.map((asset: any) => ({
    naam: asset.symbol,
    volatiliteit: asset.volatiliteit,
    marktKap: Math.log10(asset.marktKap) * 10,
    yield: asset.yield * 5,
    allocatie: asset.allocatie,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="naam" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar name="Volatiliteit" dataKey="volatiliteit" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} />
        <Radar name="Marktkapitalisatie" dataKey="marktKap" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Radar name="Yield (x5)" dataKey="yield" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}
