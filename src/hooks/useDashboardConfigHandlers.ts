
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { saveDashboardConfig } from '@/services/dashboardConfigService';
import { toast } from 'sonner';

export const useDashboardConfigHandlers = () => {
  const { userId } = useAuth();
  const { config, updateConfig } = useDashboardConfig();
  const [isSaving, setIsSaving] = useState(false);

  const handleConfigChange = (key: string, value: any) => {
    console.log('🔧 [DEBUG] handleConfigChange called:', { key, value });
    
    // Atualizar config local imediatamente
    updateConfig({ [key]: value });
    
    // NÃO salvar automaticamente - apenas atualizar estado local
    console.log('🔧 [DEBUG] Config updated locally only:', { key, value });
  };

  const handleSaveConfig = async () => {
    console.log('💾 [DEBUG] Starting save process...');
    console.log('💾 [DEBUG] Current config:', config);
    console.log('💾 [DEBUG] User ID:', userId);
    
    if (!userId) {
      console.error('❌ [DEBUG] No user ID found');
      toast.error("Erro: Usuário não autenticado");
      return;
    }

    setIsSaving(true);
    try {
      console.log('💾 [DEBUG] Calling saveDashboardConfig...');
      await saveDashboardConfig(config, userId);
      console.log('✅ [DEBUG] Save completed successfully');
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      console.error('❌ [DEBUG] Error saving config:', error);
      toast.error("Erro ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorderMetrics = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderMetrics:', newOrder);
    updateConfig({ metricsOrder: newOrder });
  };

  const handleReorderPreSales = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderPreSales:', newOrder);
    updateConfig({ preSalesOrder: newOrder });
  };

  const handleReorderProducts = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderProducts:', newOrder);
    updateConfig({ productOrder: newOrder });
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
