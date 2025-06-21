
import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductGoalStatusProps {
  isActive: boolean;
  onToggleStatus: () => void;
}

export const ProductGoalStatus: React.FC<ProductGoalStatusProps> = ({
  isActive,
  onToggleStatus
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        {isActive ? (
          <Clock className="h-5 w-5 text-blue-500" />
        ) : (
          <CheckCircle className="h-5 w-5 text-gray-400" />
        )}
        <span className="font-medium">
          Status da Meta: 
        </span>
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Ativa" : "Inativa"}
        </Badge>
      </div>
      <Button 
        onClick={onToggleStatus}
        variant={isActive ? "outline" : "default"}
        size="sm"
      >
        {isActive ? "Desativar" : "Ativar"}
      </Button>
    </div>
  );
};
