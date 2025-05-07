
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableDataProps {
  isLoading: boolean;
  tableData: any[];
  columns: string[];
  selectedTable: string;
}

const TableData = ({ isLoading, tableData, columns, selectedTable }: TableDataProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-gray-600">Carregando dados...</div>
      </div>
    );
  }

  if (tableData.length > 0) {
    return (
      <div className="border rounded-md overflow-auto max-h-96">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-100 border-gray-200">
              {columns.map((column) => (
                <TableHead key={column} className="text-gray-700">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50 border-gray-200">
                {columns.map((column) => (
                  <TableCell key={column} className="font-medium text-gray-700">
                    {typeof row[column] === 'object' 
                      ? JSON.stringify(row[column]) 
                      : String(row[column] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return selectedTable ? (
    <div className="text-center p-4 text-gray-600">
      Nenhum dado encontrado na tabela {selectedTable}
    </div>
  ) : (
    <div className="text-center p-4 text-gray-600">
      Selecione uma tabela para visualizar seus dados
    </div>
  );
};

export default TableData;
