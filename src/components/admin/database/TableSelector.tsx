
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TableSelectorProps {
  tables: string[];
  selectedTable: string;
  onTableSelect: (table: string) => void;
  onRefreshTables: () => void;
  onDownloadData: () => void;
  isLoadingTables: boolean;
  isLoadingData: boolean;
}

const TableSelector = ({
  tables,
  selectedTable,
  onTableSelect,
  onRefreshTables,
  onDownloadData,
  isLoadingTables,
  isLoadingData
}: TableSelectorProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex-1">
        <Select
          disabled={isLoadingTables}
          value={selectedTable}
          onValueChange={onTableSelect}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma tabela" />
          </SelectTrigger>
          <SelectContent>
            {tables.map((table) => (
              <SelectItem key={table} value={table}>
                {table}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        variant="outline" 
        onClick={onRefreshTables}
        disabled={isLoadingTables}
      >
        <RefreshCw className={`h-4 w-4 ${isLoadingTables ? 'animate-spin' : ''}`} />
      </Button>
      <Button 
        variant="outline" 
        onClick={onDownloadData}
        disabled={!selectedTable || isLoadingData}
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TableSelector;
