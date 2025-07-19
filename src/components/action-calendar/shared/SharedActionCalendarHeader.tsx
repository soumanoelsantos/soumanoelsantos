
import React from 'react';
import { Calendar, Users, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SharedActionCalendarHeaderProps {
  ownerName: string;
}

const SharedActionCalendarHeader = ({ ownerName }: SharedActionCalendarHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendário de Ações</h1>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{ownerName}</span>
            </div>
          </div>
        </div>
        
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Globe className="h-3 w-3 mr-1" />
          Público
        </Badge>
      </div>
      
      <p className="text-gray-600 mt-4">
        Acompanhe o progresso das ações e projetos em tempo real
      </p>
    </div>
  );
};

export default SharedActionCalendarHeader;
