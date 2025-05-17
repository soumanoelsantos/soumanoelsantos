
import { useState, useCallback, useEffect } from "react";
import { fetchAllTables, fetchTableData, executeRawQuery, prepareDataForDownload } from "@/services/databaseService";

export function useDatabaseAdmin() {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoadingTables, setIsLoadingTables] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isExecutingQuery, setIsExecutingQuery] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const fetchTables = useCallback(async () => {
    if (connectionError && retryCount >= maxRetries) {
      return; // Não tente mais se já atingiu o máximo de tentativas
    }
    
    setIsLoadingTables(true);
    try {
      const { data, error } = await fetchAllTables();
      
      if (error) {
        console.error("Error fetching tables:", error);
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
        } else {
          setConnectionError(true);
          throw error;
        }
      } else {
        setTables(data || []);
        setConnectionError(false);
        setRetryCount(0);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    } finally {
      setIsLoadingTables(false);
    }
  }, [connectionError, retryCount]);

  // Efeito para lidar com retry automático com backoff exponencial
  useEffect(() => {
    if (connectionError && retryCount < maxRetries) {
      const timeout = setTimeout(() => {
        fetchTables();
      }, Math.pow(2, retryCount) * 1000); // Backoff exponencial
      
      return () => clearTimeout(timeout);
    }
  }, [connectionError, retryCount, fetchTables]);

  const handleFetchTableData = useCallback(async (table: string) => {
    if (!table) return;
    
    setIsLoadingData(true);
    setSelectedTable(table);
    setSqlQuery(`SELECT * FROM ${table} LIMIT 100;`);
    
    try {
      const { data, columns, error } = await fetchTableData(table, 100);
      
      if (error) throw error;
      
      setTableData(data);
      setColumns(columns);
    } catch (error: any) {
      console.error(`Error fetching data from ${table}:`, error);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const executeQuery = useCallback(async () => {
    if (!sqlQuery.trim()) {
      return;
    }
    
    setIsExecutingQuery(true);
    
    try {
      const { data, error } = await executeRawQuery(sqlQuery);
      
      if (error) throw error;
      
      setQueryResult(data);
    } catch (error: any) {
      console.error("Error executing query:", error);
    } finally {
      setIsExecutingQuery(false);
    }
  }, [sqlQuery]);

  const downloadTableData = useCallback(() => {
    if (!tableData.length) {
      return;
    }
    
    const jsonString = prepareDataForDownload(tableData);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTable}-data.json`;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, [tableData, selectedTable]);

  return {
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
    fetchTableData: handleFetchTableData,
    executeQuery,
    downloadTableData,
    setSqlQuery
  };
}
