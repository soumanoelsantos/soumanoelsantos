
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminInfoCard: React.FC = () => {
  return (
    <Card className="bg-dark-background/50 border-dark-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-dark-text">Informações</CardTitle>
        <CardDescription className="text-dark-text/80">
          Sobre o painel administrativo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-dark-text/90 mb-2">
          Este painel permite gerenciar o acesso dos usuários aos diferentes módulos do programa:
        </p>
        <ul className="list-disc list-inside space-y-1 text-dark-text/80 ml-4">
          <li>Ative ou desative o status de "Novo Usuário"</li>
          <li>Desbloqueie módulos específicos para cada usuário</li>
          <li>As alterações são aplicadas imediatamente</li>
        </ul>
        <p className="text-dark-text/90 mt-4 italic">
          Nota: Em um ambiente de produção, estas alterações seriam salvas em um banco de dados.
        </p>
      </CardContent>
    </Card>
  );
};

export default AdminInfoCard;
