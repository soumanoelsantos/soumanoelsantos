
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MindMapsManager from '@/components/mind-maps/MindMapsManager';

const Empresas = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestão de Empresas
          </h1>
          <p className="text-gray-600">
            Gerencie mapas mentais para suas empresas e compartilhe com sua equipe
          </p>
        </div>

        <MindMapsManager />
      </div>
    </div>
  );
};

export default Empresas;
