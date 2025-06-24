
import React from 'react';
import { Calendar, Eye, Building2 } from 'lucide-react';

interface SharedActionCalendarHeaderProps {
  ownerName: string;
}

const SharedActionCalendarHeader = ({ ownerName }: SharedActionCalendarHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Calendário de Ações
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">{ownerName}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <Eye className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Público</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm">
            Acompanhe o progresso das ações e projetos em tempo real
          </p>
        </div>
      </div>
    </div>
  );
};

export default SharedActionCalendarHeader;
