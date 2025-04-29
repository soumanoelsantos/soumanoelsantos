
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DiagnosticResultsChart from '@/components/DiagnosticResultsChart';

interface ResultsCardProps {
  results: {
    processos: { score: number; total: number; percentage: number };
    resultados: { score: number; total: number; percentage: number };
    sistemaGestao: { score: number; total: number; percentage: number };
    pessoas: { score: number; total: number; percentage: number };
  };
}

const ResultsCard = ({ results }: ResultsCardProps) => {
  return (
    <Card className="bg-white border-dark-primary/20">
      <CardHeader className="bg-[#1d365c] text-white">
        <CardTitle className="text-xl text-center text-white">Resultados do Diagnóstico</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-300">
                  <TableHead className="text-gray-800">Dimensão</TableHead>
                  <TableHead className="text-gray-800 text-right">Atual</TableHead>
                  <TableHead className="text-gray-800 text-right">Desejado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-gray-200">
                  <TableCell className="font-medium text-gray-800">PROCESSOS</TableCell>
                  <TableCell className="text-right text-gray-800">{results.processos.percentage}%</TableCell>
                  <TableCell className="text-right text-gray-800">100%</TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-200">
                  <TableCell className="font-medium text-gray-800">RESULTADOS</TableCell>
                  <TableCell className="text-right text-gray-800">{results.resultados.percentage}%</TableCell>
                  <TableCell className="text-right text-gray-800">100%</TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-200">
                  <TableCell className="font-medium text-gray-800">SISTEMA DE GESTÃO</TableCell>
                  <TableCell className="text-right text-gray-800">{results.sistemaGestao.percentage}%</TableCell>
                  <TableCell className="text-right text-gray-800">100%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-800">PESSOAS</TableCell>
                  <TableCell className="text-right text-gray-800">{results.pessoas.percentage}%</TableCell>
                  <TableCell className="text-right text-gray-800">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center items-center chart-container">
            <DiagnosticResultsChart data={results} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
