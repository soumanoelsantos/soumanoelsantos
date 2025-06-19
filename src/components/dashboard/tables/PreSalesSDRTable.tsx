
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PreSalesSDRTableProps {
  data: Array<{
    name: string;
    calls: number;
    schedulings: number;
    noShow: number;
    conversionRate: number;
  }>;
}

const PreSalesSDRTable = ({ data }: PreSalesSDRTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance dos SDRs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SDR</TableHead>
              <TableHead className="text-right">Ligações</TableHead>
              <TableHead className="text-right">Agendamentos</TableHead>
              <TableHead className="text-right">No-Show</TableHead>
              <TableHead className="text-right">Taxa Conversão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((sdr) => (
              <TableRow key={sdr.name}>
                <TableCell className="font-medium">{sdr.name}</TableCell>
                <TableCell className="text-right">{sdr.calls}</TableCell>
                <TableCell className="text-right">{sdr.schedulings}</TableCell>
                <TableCell className="text-right">{sdr.noShow}</TableCell>
                <TableCell className="text-right">{sdr.conversionRate.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PreSalesSDRTable;
