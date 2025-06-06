
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

interface DiagnosticoChartsProps {
  resultados: DiagnosticoResultados;
  areas: Array<{
    key: string;
    nome: string;
    cor: string;
  }>;
}

const DiagnosticoCharts: React.FC<DiagnosticoChartsProps> = ({ resultados, areas }) => {
  const chartData = areas.map(area => ({
    name: area.nome,
    atual: resultados[area.key as keyof DiagnosticoResultados]?.percentage || 0,
    meta: 85
  }));

  const radarData = areas.map(area => ({
    area: area.nome.split(' ')[0], // Primeira palavra para o radar
    value: resultados[area.key as keyof DiagnosticoResultados]?.percentage || 0
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Gráfico de barras */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Resultado Atual vs Meta</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={10}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="atual" fill="#3b82f6" name="Atual" />
              <Bar dataKey="meta" fill="#22c55e" name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico radar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Radar de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="area" fontSize={10} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                fontSize={8}
              />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticoCharts;
