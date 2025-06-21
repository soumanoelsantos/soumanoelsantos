
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SpecificGoalsConfigCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Metas Específicas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertDescription>
            <strong>Funcionalidade Removida</strong><br />
            As metas específicas foram removidas do sistema.<br />
            Esta funcionalidade não está mais disponível.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default SpecificGoalsConfigCard;
