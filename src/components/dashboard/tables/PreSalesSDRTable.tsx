
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const PreSalesSDRTable = () => {
  const sdrData = [
    {
      id: 1,
      nome: 'João Silva',
      tentativas: 145,
      agendamentos: 28,
      noShow: 4,
      taxa_conversao: 19.3,
      taxa_noshow: 14.3,
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      tentativas: 132,
      agendamentos: 22,
      noShow: 3,
      taxa_conversao: 16.7,
      taxa_noshow: 13.6,
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      tentativas: 98,
      agendamentos: 18,
      noShow: 5,
      taxa_conversao: 18.4,
      taxa_noshow: 27.8,
      status: 'Ativo'
    },
    {
      id: 4,
      nome: 'Ana Oliveira',
      tentativas: 156,
      agendamentos: 31,
      noShow: 2,
      taxa_conversao: 19.9,
      taxa_noshow: 6.5,
      status: 'Ativo'
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'Ativo' ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        {status}
      </Badge>
    ) : (
      <Badge variant="destructive">{status}</Badge>
    );
  };

  const getConversionColor = (taxa: number) => {
    if (taxa >= 18) return 'text-green-600 font-semibold';
    if (taxa >= 15) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const getNoShowColor = (taxa: number) => {
    if (taxa <= 15) return 'text-green-600 font-semibold';
    if (taxa <= 20) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance dos SDRs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-center">Tentativas</TableHead>
                <TableHead className="text-center">Agendamentos</TableHead>
                <TableHead className="text-center">No-Show</TableHead>
                <TableHead className="text-center">Taxa Conversão</TableHead>
                <TableHead className="text-center">Taxa No-Show</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sdrData.map((sdr) => (
                <TableRow key={sdr.id}>
                  <TableCell className="font-medium">{sdr.nome}</TableCell>
                  <TableCell className="text-center">{sdr.tentativas}</TableCell>
                  <TableCell className="text-center font-semibold text-blue-600">
                    {sdr.agendamentos}
                  </TableCell>
                  <TableCell className="text-center">{sdr.noShow}</TableCell>
                  <TableCell className={`text-center ${getConversionColor(sdr.taxa_conversao)}`}>
                    {sdr.taxa_conversao}%
                  </TableCell>
                  <TableCell className={`text-center ${getNoShowColor(sdr.taxa_noshow)}`}>
                    {sdr.taxa_noshow}%
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(sdr.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreSalesSDRTable;
