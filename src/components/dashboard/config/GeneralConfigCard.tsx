
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DashboardConfig } from '@/types/dashboardConfig';

interface GeneralConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: string) => void;
}

const GeneralConfigCard: React.FC<GeneralConfigCardProps> = ({ config, onConfigChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Gerais</CardTitle>
        <CardDescription>Configure as informações básicas do seu dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Nome da Empresa</Label>
          <Input
            id="companyName"
            value={config.companyName}
            onChange={(e) => onConfigChange('companyName', e.target.value)}
            placeholder="Digite o nome da sua empresa"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralConfigCard;
