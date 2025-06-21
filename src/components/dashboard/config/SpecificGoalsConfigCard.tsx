
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardConfig } from '@/types/dashboardConfig';

interface SpecificGoalsConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean | string[]) => void;
}

const SpecificGoalsConfigCard: React.FC<SpecificGoalsConfigCardProps> = ({ 
  config, 
  onConfigChange 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funcionalidade Removida</CardTitle>
        <CardDescription>
          As metas específicas foram removidas do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          Esta funcionalidade não está mais disponível.
        </p>
      </CardContent>
    </Card>
  );
};

export default SpecificGoalsConfigCard;
