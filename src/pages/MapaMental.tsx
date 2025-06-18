
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import MindMapsManager from '@/components/mind-maps/MindMapsManager';

const MapaMental = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate('/membros')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Área de Membros
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mapas Mentais
          </h1>
          <p className="text-gray-600">
            Crie e gerencie mapas mentais para organizar ideias e compartilhar com sua equipe
          </p>
        </div>

        <MindMapsManager />
      </div>
    </div>
  );
};

export default MapaMental;
