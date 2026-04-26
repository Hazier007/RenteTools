import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

interface PortfolioDiversificatieChart3Props {
  data: any[];
}

export default function PortfolioDiversificatieChart3({ data }: PortfolioDiversificatieChart3Props) {
  const radarData = data.map((asset: any) => ({
    naam: asset.naam.split(' ')[0],
    rendement: asset.verwachtRendement,
    volatiliteit: asset.volatiliteit,
    allocatie: asset.allocatie,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="naam" />
        <PolarRadiusAxis angle={30} domain={[0, 30]} />
        <Radar name="Rendement" dataKey="rendement" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Radar name="Volatiliteit" dataKey="volatiliteit" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}
