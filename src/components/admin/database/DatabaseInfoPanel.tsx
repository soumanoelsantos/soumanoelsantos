
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TableSelector from "./TableSelector";
import TableData from "./TableData";

interface DatabaseInfoPanelProps {
  tables: string[];
  selectedTable: string;
  tableData: any[];
  columns: string[];
  isLoadingTables: boolean;
  isLoadingData: boolean;
  onTableSelect: (table: string) => void;
  onRefreshTables: () => void;
  onDownloadData: () => void;
}

const DatabaseInfoPanel = ({
  tables,
  selectedTable,
  tableData,
  columns,
  isLoadingTables,
  isLoadingData,
  onTableSelect,
  onRefreshTables,
  onDownloadData
}: DatabaseInfoPanelProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Tabelas do Banco de Dados</CardTitle>
        <CardDescription className="text-gray-600">
          Selecione uma tabela para ver seus registros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableSelector
          tables={tables}
          selectedTable={selectedTable}
          onTableSelect={onTableSelect}
          onRefreshTables={onRefreshTables}
          onDownloadData={onDownloadData}
          isLoadingTables={isLoadingTables}
          isLoadingData={isLoadingData}
        />
        
        <TableData
          isLoading={isLoadingData}
          tableData={tableData}
          columns={columns}
          selectedTable={selectedTable}
        />
      </CardContent>
    </Card>
  );
};

export default DatabaseInfoPanel;
