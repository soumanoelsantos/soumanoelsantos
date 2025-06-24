
import React from 'react';
import { Calendar, Eye } from 'lucide-react';

interface SharedActionCalendarHeaderProps {
  ownerName: string;
}

const SharedActionCalendarHeader = ({ ownerName }: SharedActionCalendarHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Calendário de Ações - {ownerName}
          </h1>
          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <Eye className="h-4 w-4" />
            Visualização pública
          </p>
        </div>
      </div>
    </div>
  );
};

export default SharedActionCalendarHeader;
