
import React from 'react';
import { BarChart3, Settings, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const DashboardCard = () => {
  const navigate = useNavigate();

  const handleAccessDashboard = () => {
    navigate('/dashboard');
  };

  const handleConfigureDashboard = () => {
    navigate('/dashboard/configurar');
  };

  const handleGenerateLink = () => {
    // Gerar link público para o dashboard da empresa
    const dashboardUrl = `${window.location.origin}/dashboard/empresa/${Date.now()}`;
    navigator.clipboard.writeText(dashboardUrl);
    // TODO: Adicionar toast de confirmação
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-800">Dashboard Empresarial</CardTitle>
            <CardDescription className="text-gray-600">
              Monitore suas métricas e acompanhe o desempenho da sua empresa
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={handleAccessDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Acessar Dashboard
          </Button>
          
          <Button 
            onClick={handleConfigureDashboard}
            variant="outline" 
            className="border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Configurar Dashboard
          </Button>
          
          <Button 
            onClick={handleGenerateLink}
            variant="outline" 
            className="border-green-300 text-green-700 hover:bg-green-50 flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Gerar Link Público
          </Button>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-gray-800 mb-2">Recursos do Dashboard:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Métricas de vendas e faturamento</li>
            <li>• Acompanhamento de equipe</li>
            <li>• Leads gerados e conversões</li>
            <li>• Indicadores personalizáveis</li>
            <li>• Gráficos em tempo real</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
