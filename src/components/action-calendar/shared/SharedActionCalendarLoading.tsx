
import React from 'react';
import { Calendar } from 'lucide-react';

const SharedActionCalendarLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <Calendar className="h-16 w-16 mx-auto mb-4 text-blue-600 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Carregando Calendário</h2>
        <p className="text-gray-600">Aguarde enquanto carregamos as ações...</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SharedActionCalendarLoading;
