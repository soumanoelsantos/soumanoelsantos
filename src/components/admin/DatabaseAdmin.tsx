
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { executeRawQuery, fetchAllTables } from "@/services/adminService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, RefreshCw, Play } from "lucide-react";

const DatabaseAdmin = () => {
  const { toast } = useToast();
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoadingTables, setIsLoadingTables] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isExecutingQuery, setIsExecutingQuery] = useState(false);

  // Fetch all tables on component mount
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setIsLoadingTables(true);
    try {
      // Use our updated fetchAllTables function that calls the edge function
      const { data, error } = await fetchAllTables();
      if (error) throw error;
      setTables(data || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
      toast({
        variant: "destructive",
        title: "Erro ao buscar tabelas",
        description: "Não foi possível buscar as tabelas do banco."
      });
      
      // Try a more direct approach using the edge function
      try {
        const { data, error } = await supabase.functions.invoke('admin-helpers', {
          body: { action: 'listTables' }
        });
        
        if (error) throw error;
        if (data) {
          setTables(Array.isArray(data) ? data : []);
        }
      } catch (secondError) {
        console.error("Second error fetching tables:", secondError);
      }
    } finally {
      setIsLoadingTables(false);
    }
  };

  const fetchTableData = async (table: string) => {
    if (!table) return;
    
    setIsLoadingData(true);
    setSelectedTable(table);
    setSqlQuery(`SELECT * FROM ${table} LIMIT 100;`);
    
    try {
      // Use executeRawQuery since we can't directly use .from with dynamic table name
      const { data, error } = await executeRawQuery(`SELECT * FROM ${table} LIMIT 100;`);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setTableData(data);
        setColumns(Object.keys(data[0]));
      } else {
        setTableData([]);
        setColumns([]);
        toast({
          title: "Tabela vazia",
          description: `A tabela ${table} não possui registros.`
        });
      }
    } catch (error: any) {
      console.error(`Error fetching data from ${table}:`, error);
      toast({
        variant: "destructive",
        title: "Erro ao buscar dados",
        description: error.message || `Não foi possível buscar dados da tabela ${table}.`
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const executeQuery = async () => {
    if (!sqlQuery.trim()) {
      toast({
        variant: "destructive",
        title: "Query vazia",
        description: "Por favor, insira uma query para executar."
      });
      return;
    }
    
    setIsExecutingQuery(true);
    
    try {
      // Use our updated executeRawQuery function
      const { data, error } = await executeRawQuery(sqlQuery);
      
      if (error) throw error;
      
      setQueryResult(data);
      toast({
        title: "Query executada",
        description: "A query foi executada com sucesso."
      });
    } catch (error: any) {
      console.error("Error executing query:", error);
      toast({
        variant: "destructive",
        title: "Erro ao executar query",
        description: error.message || "Não foi possível executar a query."
      });
    } finally {
      setIsExecutingQuery(false);
    }
  };

  const downloadTableData = () => {
    if (!tableData.length) {
      toast({
        variant: "destructive",
        title: "Sem dados",
        description: "Não há dados para baixar."
      });
      return;
    }
    
    const jsonString = JSON.stringify(tableData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTable}-data.json`;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Tabelas do Banco de Dados</CardTitle>
          <CardDescription className="text-gray-600">
            Selecione uma tabela para ver seus registros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1">
              <Select
                disabled={isLoadingTables}
                onValueChange={(value) => fetchTableData(value)}
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
              onClick={fetchTables}
              disabled={isLoadingTables}
            >
              <RefreshCw className={`h-4 w-4 ${isLoadingTables ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              onClick={downloadTableData}
              disabled={!tableData.length || isLoadingData}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {isLoadingData ? (
            <div className="flex justify-center p-8">
              <div className="text-gray-600">Carregando dados...</div>
            </div>
          ) : tableData.length > 0 ? (
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
          ) : selectedTable ? (
            <div className="text-center p-4 text-gray-600">
              Nenhum dado encontrado na tabela {selectedTable}
            </div>
          ) : (
            <div className="text-center p-4 text-gray-600">
              Selecione uma tabela para visualizar seus dados
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Consulta SQL</CardTitle>
          <CardDescription className="text-gray-600">
            Execute consultas SQL diretas no banco de dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              placeholder="Digite sua consulta SQL aqui..."
              className="font-mono min-h-[200px]"
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={executeQuery} 
                disabled={isExecutingQuery || !sqlQuery.trim()}
              >
                <Play className="h-4 w-4 mr-2" />
                Executar Query
              </Button>
            </div>
            
            {isExecutingQuery && (
              <div className="text-center p-4">
                <div className="text-gray-600">Executando query...</div>
              </div>
            )}
            
            {queryResult && !isExecutingQuery && (
              <div className="border rounded-md overflow-auto max-h-96 p-4">
                <pre className="text-sm text-gray-700">{JSON.stringify(queryResult, null, 2)}</pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseAdmin;
