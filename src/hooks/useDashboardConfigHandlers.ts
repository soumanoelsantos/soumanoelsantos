
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { saveDashboardConfig } from '@/services/dashboardConfigService';
import { toast } from 'sonner';

export const useDashboardConfigHandlers = () => {
  const { userId } = useAuth();
  const { config, updateConfig } = useDashboardConfig();
  const [isSaving, setIsSaving] = useState(false);

  const handleConfigChange = async (key: string, value: any) => {
    console.log('🔧 [DEBUG] handleConfigChange called:', { key, value });
    
    try {
      // Atualizar config local imediatamente
      updateConfig({ [key]: value });
      
      // Remover auto-save para companyName - apenas para abas críticas
      const criticalKeys = ['enableCommercialTab', 'enableProductTab', 'enablePreSalesTab'];
      
      if (criticalKeys.includes(key)) {
        if (!userId) {
          console.error('❌ [DEBUG] Usuário não autenticado');
          toast.error("Erro: Usuário não autenticado");
          return;
        }

        try {
          const updatedConfig = { ...config, [key]: value };
          console.log('💾 [DEBUG] Salvando automaticamente configuração crítica...', { key, value });
          
          await saveDashboardConfig(updatedConfig, userId);
          
          console.log('✅ [DEBUG] Configuração crítica salva automaticamente!');
          toast.success("Configuração salva automaticamente!");
        } catch (error) {
          console.error('❌ [DEBUG] Erro ao salvar configuração crítica:', error);
          toast.error("Erro: Não foi possível salvar a configuração");
        }
      }
    } catch (error) {
      console.error('❌ [DEBUG] Erro em handleConfigChange:', error);
      toast.error("Erro: Falha ao processar mudança de configuração");
    }
  };

  const handleSaveConfig = async () => {
    if (!userId) {
      toast.error("Erro: Usuário não autenticado");
      return;
    }

    setIsSaving(true);
    try {
      await saveDashboardConfig(config, userId);
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao salvar configurações:', error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorderMetrics = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderMetrics:', newOrder);
    try {
      updateConfig({ metricsOrder: newOrder });
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao reordenar métricas:', error);
      toast.error("Erro ao reordenar métricas");
    }
  };

  const handleReorderPreSales = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderPreSales:', newOrder);
    try {
      updateConfig({ preSalesOrder: newOrder });
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao reordenar pré-vendas:', error);
      toast.error("Erro ao reordenar pré-vendas");
    }
  };

  const handleReorderProducts = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderProducts:', newOrder);
    try {
      updateConfig({ productOrder: newOrder });
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao reordenar produtos:', error);
      toast.error("Erro ao reordenar produtos");
    }
  };

  return {
    config,
    isSaving,
    handleConfigChange,
    handleSaveConfig,
    handleReorderMetrics,
    handleReorderPreSales,
    handleReorderProducts
  };
};
