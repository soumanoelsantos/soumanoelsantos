
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useClosersPerformanceData } from '@/hooks/useClosersPerformanceData';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

const ClosersPerformanceTable = () => {
  const { data, isLoading } = useClosersPerformanceData();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">DESEMPENHO DOS CLOSERS</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <div className="text-gray-500">Carregando dados...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">DESEMPENHO DOS CLOSERS</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800">
              <TableHead className="text-white font-bold">Closer</TableHead>
              <TableHead className="text-white font-bold text-center">Agendadas</TableHead>
              <TableHead className="text-white font-bold text-center">Real</TableHead>
              <TableHead className="text-white font-bold text-center">No show</TableHead>
              <TableHead className="text-white font-bold text-center">Vendas</TableHead>
              <TableHead className="text-white font-bold text-center">Faturamento</TableHead>
              <TableHead className="text-white font-bold text-center">Real Fat.</TableHead>
              <TableHead className="text-white font-bold text-center">Receita</TableHead>
              <TableHead className="text-white font-bold text-center">Real Rec.</TableHead>
              <TableHead className="text-white font-bold text-center">Ticket Médio</TableHead>
              <TableHead className="text-white font-bold text-center">Conversão</TableHead>
              <TableHead className="text-white font-bold text-center">Cash Collect</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.closers.map((closer, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{closer.name}</TableCell>
                <TableCell className="text-center bg-gray-300">{closer.agendadas}</TableCell>
                <TableCell className="text-center bg-green-200">{closer.real}</TableCell>
                <TableCell className="text-center bg-red-200">{closer.noShow}</TableCell>
                <TableCell className="text-center bg-blue-100">{closer.vendas}</TableCell>
                <TableCell className="text-center bg-purple-200">{formatCurrency(closer.faturamento)}</TableCell>
                <TableCell className="text-center">{formatPercentage(closer.realFaturamento)}</TableCell>
                <TableCell className="text-center bg-pink-200">{formatCurrency(closer.receita)}</TableCell>
                <TableCell className="text-center bg-blue-300">{formatPercentage(closer.realReceita)}</TableCell>
                <TableCell className="text-center bg-yellow-200">{formatCurrency(closer.ticketMedio)}</TableCell>
                <TableCell className="text-center">{formatPercentage(closer.conversao)}</TableCell>
                <TableCell className="text-center bg-gray-400">{formatPercentage(closer.cashCollect)}</TableCell>
              </TableRow>
            ))}
            
            {/* Linha de Total */}
            <TableRow className="bg-gray-100 font-bold border-t-2 border-gray-400">
              <TableCell className="font-bold">Total geral</TableCell>
              <TableCell className="text-center bg-gray-300">{data.total.agendadas}</TableCell>
              <TableCell className="text-center bg-green-200">{data.total.real}</TableCell>
              <TableCell className="text-center bg-red-200">{data.total.noShow}</TableCell>
              <TableCell className="text-center bg-blue-100">{data.total.vendas}</TableCell>
              <TableCell className="text-center bg-purple-200">{formatCurrency(data.total.faturamento)}</TableCell>
              <TableCell className="text-center">{formatPercentage(data.total.realFaturamento)}</TableCell>
              <TableCell className="text-center bg-pink-200">{formatCurrency(data.total.receita)}</TableCell>
              <TableCell className="text-center bg-blue-300">{formatPercentage(data.total.realReceita)}</TableCell>
              <TableCell className="text-center bg-yellow-200">{formatCurrency(data.total.ticketMedio)}</TableCell>
              <TableCell className="text-center">{formatPercentage(data.total.conversao)}</TableCell>
              <TableCell className="text-center bg-gray-400">{formatPercentage(data.total.cashCollect)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClosersPerformanceTable;
