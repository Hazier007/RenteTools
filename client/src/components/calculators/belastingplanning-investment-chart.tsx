import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface BelastingplanningInvestmentChartProps {
  data: any[];
}

export default function BelastingplanningInvestmentChart({ data }: BelastingplanningInvestmentChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vehicle" />
        <YAxis />
        <Tooltip formatter={(value, name) => [
          name === 'afterTaxValue' ? formatCurrency(Number(value)) : `${Number(value).toFixed(2)}%`,
          name === 'grossReturn' ? 'Bruto Rendement' :
          name === 'taxCost' ? 'Belastingkost' :
          name === 'netReturn' ? 'Netto Rendement' :
          'Na-belasting Waarde (10 jaar)'
        ]} />
        <Legend />
        <Bar dataKey="grossReturn" fill="#8884d8" name="Bruto Rendement" />
        <Bar dataKey="netReturn" fill="#82ca9d" name="Netto Rendement" />
      </BarChart>
    </ResponsiveContainer>
  );
}
