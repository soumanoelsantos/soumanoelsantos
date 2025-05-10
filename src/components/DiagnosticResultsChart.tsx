
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface DiagnosticResultsChartProps {
  data: {
    processos: { percentage: number };
    resultados: { percentage: number };
    sistemaGestao: { percentage: number };
    pessoas: { percentage: number };
  };
}

const DiagnosticResultsChart = ({ data }: DiagnosticResultsChartProps) => {
  const chartData = [
    {
      subject: 'PROCESSOS',
      A: 100, // Desejado
      B: data.processos.percentage, // Atual
      fullMark: 100,
    },
    {
      subject: 'RESULTADOS',
      A: 100, // Desejado
      B: data.resultados.percentage,
      fullMark: 100,
    },
    {
      subject: 'SISTEMA DE GESTÃO',
      A: 100, // Desejado
      B: data.sistemaGestao.percentage,
      fullMark: 100,
    },
    {
      subject: 'PESSOAS',
      A: 100, // Desejado
      B: data.pessoas.percentage,
      fullMark: 100,
    },
  ];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid gridType="circle" stroke="rgba(0, 0, 0, 0.2)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#333333' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#333333' }} />
          <Radar
            name="Desejado"
            dataKey="A"
            stroke="#0284c7"
            fill="#0284c7"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Atual"
            dataKey="B"
            stroke="#d97706"
            fill="#d97706"
            fillOpacity={0.5}
            strokeWidth={2}
          />
          <Legend 
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: "20px" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiagnosticResultsChart;
