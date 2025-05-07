
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play } from "lucide-react";

interface SQLEditorProps {
  sqlQuery: string;
  onSqlQueryChange: (query: string) => void;
  onExecuteQuery: () => void;
  isExecutingQuery: boolean;
  queryResult: any;
}

const SQLEditor = ({
  sqlQuery,
  onSqlQueryChange,
  onExecuteQuery,
  isExecutingQuery,
  queryResult
}: SQLEditorProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={sqlQuery}
        onChange={(e) => onSqlQueryChange(e.target.value)}
        placeholder="Digite sua consulta SQL aqui..."
        className="font-mono min-h-[200px]"
      />
      
      <div className="flex justify-end">
        <Button 
          onClick={onExecuteQuery} 
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
  );
};

export default SQLEditor;
