
import React, { useEffect } from "react";
import DatabaseInfoPanel from "./database/DatabaseInfoPanel";
import SQLQueryPanel from "./database/SQLQueryPanel";
import { useDatabaseAdmin } from "./database/useDatabaseAdmin";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DatabaseAdmin = () => {
  const {
    tables,
    selectedTable,
    tableData,
    columns,
    isLoadingTables,
    isLoadingData,
    sqlQuery,
    queryResult,
    isExecutingQuery,
    connectionError,
    fetchTables,
    fetchTableData,
    executeQuery,
    downloadTableData,
    setSqlQuery
  } = useDatabaseAdmin();

  // Fetch all tables on component mount
  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  if (connectionError) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro de conexão</AlertTitle>
          <AlertDescription>
            Não foi possível conectar ao banco de dados. Verifique sua conexão e tente novamente.
          </AlertDescription>
        </Alert>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Administração do Banco de Dados</CardTitle>
            <CardDescription className="text-gray-600">
              Houve um problema ao conectar com o serviço de banco de dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchTables} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DatabaseInfoPanel
        tables={tables}
        selectedTable={selectedTable}
        tableData={tableData}
        columns={columns}
        isLoadingTables={isLoadingTables}
        isLoadingData={isLoadingData}
        onTableSelect={fetchTableData}
        onRefreshTables={fetchTables}
        onDownloadData={downloadTableData}
      />

      <SQLQueryPanel
        sqlQuery={sqlQuery}
        onSqlQueryChange={setSqlQuery}
        onExecuteQuery={executeQuery}
        isExecutingQuery={isExecutingQuery}
        queryResult={queryResult}
      />
    </div>
  );
};

export default DatabaseAdmin;
