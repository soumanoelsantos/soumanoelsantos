
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SQLEditor from "./SQLEditor";

interface SQLQueryPanelProps {
  sqlQuery: string;
  onSqlQueryChange: (query: string) => void;
  onExecuteQuery: () => void;
  isExecutingQuery: boolean;
  queryResult: any;
}

const SQLQueryPanel = ({
  sqlQuery,
  onSqlQueryChange,
  onExecuteQuery,
  isExecutingQuery,
  queryResult
}: SQLQueryPanelProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Consulta SQL</CardTitle>
        <CardDescription className="text-gray-600">
          Execute consultas SQL diretas no banco de dados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SQLEditor
          sqlQuery={sqlQuery}
          onSqlQueryChange={onSqlQueryChange}
          onExecuteQuery={onExecuteQuery}
          isExecutingQuery={isExecutingQuery}
          queryResult={queryResult}
        />
      </CardContent>
    </Card>
  );
};

export default SQLQueryPanel;
