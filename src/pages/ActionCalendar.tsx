
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ActionCalendarManager from '@/components/action-calendar/ActionCalendarManager';
import { useAuth } from '@/hooks/useAuth';

const ActionCalendar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/membros')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Área de Membros
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Calendário de Ações
          </h1>
          <p className="text-gray-600">
            Gerencie e acompanhe todas as ações da sua equipe em um só lugar
          </p>
        </div>

        <ActionCalendarManager />
      </div>
    </div>
  );
};

export default ActionCalendar;
