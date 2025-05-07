
import React, { useEffect } from "react";
import DatabaseInfoPanel from "./database/DatabaseInfoPanel";
import SQLQueryPanel from "./database/SQLQueryPanel";
import { useDatabaseAdmin } from "./database/useDatabaseAdmin";

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
