
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const DashboardConfig = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    showSales: true,
    showLeads: true,
    showConversion: true,
    showTeam: false,
    showRevenue: true,
    showTicketMedio: true,
    companyName: '',
    showMonthlyGoals: true,
    showCharts: true
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleConfigChange = (key: string, value: boolean | string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // TODO: Salvar configurações no banco de dados
    console.log('Configurações salvas:', config);
    navigate('/dashboard');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Configurar Dashboard</h1>
                <p className="text-gray-600">Personalize seu dashboard empresarial</p>
              </div>
            </div>
            
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configurações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configure as informações básicas do seu dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  value={config.companyName}
                  onChange={(e) => handleConfigChange('companyName', e.target.value)}
                  placeholder="Digite o nome da sua empresa"
                />
              </div>
            </CardContent>
          </Card>

          {/* Indicadores a Exibir */}
          <Card>
            <CardHeader>
              <CardTitle>Indicadores</CardTitle>
              <CardDescription>Selecione quais indicadores deseja exibir no dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showSales"
                  checked={config.showSales}
                  onCheckedChange={(checked) => handleConfigChange('showSales', checked)}
                />
                <Label htmlFor="showSales">Total de Vendas</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showLeads"
                  checked={config.showLeads}
                  onCheckedChange={(checked) => handleConfigChange('showLeads', checked)}
                />
                <Label htmlFor="showLeads">Leads Gerados</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showConversion"
                  checked={config.showConversion}
                  onCheckedChange={(checked) => handleConfigChange('showConversion', checked)}
                />
                <Label htmlFor="showConversion">Taxa de Conversão</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showRevenue"
                  checked={config.showRevenue}
                  onCheckedChange={(checked) => handleConfigChange('showRevenue', checked)}
                />
                <Label htmlFor="showRevenue">Receita</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showTicketMedio"
                  checked={config.showTicketMedio}
                  onCheckedChange={(checked) => handleConfigChange('showTicketMedio', checked)}
                />
                <Label htmlFor="showTicketMedio">Ticket Médio</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showTeam"
                  checked={config.showTeam}
                  onCheckedChange={(checked) => handleConfigChange('showTeam', checked)}
                />
                <Label htmlFor="showTeam">Performance da Equipe</Label>
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Visualização */}
          <Card>
            <CardHeader>
              <CardTitle>Visualização</CardTitle>
              <CardDescription>Configure como o dashboard será exibido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showCharts"
                  checked={config.showCharts}
                  onCheckedChange={(checked) => handleConfigChange('showCharts', checked)}
                />
                <Label htmlFor="showCharts">Exibir Gráficos</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showMonthlyGoals"
                  checked={config.showMonthlyGoals}
                  onCheckedChange={(checked) => handleConfigChange('showMonthlyGoals', checked)}
                />
                <Label htmlFor="showMonthlyGoals">Metas Mensais</Label>
              </div>
            </CardContent>
          </Card>

          {/* Preview das Configurações */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Visualize como ficará seu dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                <h3 className="font-medium text-gray-800">
                  {config.companyName || 'Sua Empresa'} - Dashboard
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {config.showSales && <div className="bg-white p-2 rounded">Vendas</div>}
                  {config.showLeads && <div className="bg-white p-2 rounded">Leads</div>}
                  {config.showConversion && <div className="bg-white p-2 rounded">Conversão</div>}
                  {config.showRevenue && <div className="bg-white p-2 rounded">Receita</div>}
                  {config.showTicketMedio && <div className="bg-white p-2 rounded">Ticket Médio</div>}
                  {config.showTeam && <div className="bg-white p-2 rounded">Equipe</div>}
                </div>
                {config.showCharts && (
                  <div className="bg-white p-2 rounded mt-2">
                    <div className="text-xs text-gray-600">Gráficos serão exibidos aqui</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardConfig;
