
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
    <Card className="bg-dark-primary/5 border-dark-primary/20">
      <CardHeader className="bg-[#1d365c] text-white">
        <CardTitle className="text-xl text-center">Resultados do Diagnóstico</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Table className="text-white">
              <TableHeader>
                <TableRow>
                  <TableHead>Dimensão</TableHead>
                  <TableHead>Atual</TableHead>
                  <TableHead>Desejado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">PROCESSOS</TableCell>
                  <TableCell>{results.processos.percentage}%</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">RESULTADOS</TableCell>
                  <TableCell>{results.resultados.percentage}%</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">SISTEMA DE GESTÃO</TableCell>
                  <TableCell>{results.sistemaGestao.percentage}%</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">PESSOAS</TableCell>
                  <TableCell>{results.pessoas.percentage}%</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center items-center">
            <DiagnosticResultsChart data={results} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
