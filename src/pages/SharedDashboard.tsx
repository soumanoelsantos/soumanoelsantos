
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Eye, Lock } from 'lucide-react';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import PreSalesMetrics from '@/components/dashboard/PreSalesMetrics';

interface SharedDashboardData {
  companyName?: string;
  userId: string;
  isPublic: boolean;
}

const SharedDashboard = () => {
  const { shareToken } = useParams<{ shareToken: string }>();
  const [dashboardData, setDashboardData] = useState<SharedDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('comercial');

  useEffect(() => {
    const loadSharedDashboard = async () => {
      if (!shareToken) {
        setError('Token de compartilhamento não encontrado');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('dashboard_configs')
          .select('user_id, company_name, is_public')
          .eq('share_token', shareToken)
          .eq('is_public', true)
          .maybeSingle();

        if (error) {
          console.error('Error loading shared dashboard:', error);
          setError('Erro ao carregar dashboard compartilhado');
          setIsLoading(false);
          return;
        }

        if (!data) {
          setError('Dashboard não encontrado ou não está público');
          setIsLoading(false);
          return;
        }

        setDashboardData({
          companyName: data.company_name,
          userId: data.user_id,
          isPublic: data.is_public
        });
      } catch (err) {
        console.error('Error in loadSharedDashboard:', err);
        setError('Erro inesperado ao carregar dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadSharedDashboard();
  }, [shareToken]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-red-600">Acesso Negado</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              {error || 'Este dashboard não está disponível publicamente.'}
            </p>
            <Badge variant="secondary" className="text-xs">
              Código: {shareToken?.substring(0, 8)}...
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  Dashboard Público
                </Badge>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {dashboardData.companyName ? `${dashboardData.companyName} - Dashboard` : 'Dashboard Empresarial'}
                </h1>
                <p className="text-gray-600">Métricas em tempo real</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Visualização pública</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="comercial">Comercial</TabsTrigger>
            <TabsTrigger value="pre-vendas">Pré-vendas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comercial">
            <DashboardMetrics isPublicView={true} sharedUserId={dashboardData.userId} />
          </TabsContent>
          
          <TabsContent value="pre-vendas">
            <PreSalesMetrics isPublicView={true} sharedUserId={dashboardData.userId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SharedDashboard;
