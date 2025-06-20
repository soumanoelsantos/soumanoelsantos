
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { MetricsCards } from '../metrics/MetricsCards';
import { GoalComponents } from '../goals/GoalComponents';
import { ChartsSection } from '../charts/ChartComponents';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
  isPublicView?: boolean;
  sharedUserId?: string;
}

export const ItemRenderer: React.FC<ItemRendererProps> = ({ 
  itemKey, 
  config, 
  isPublicView = false, 
  sharedUserId 
}) => {
  // Verificar se o item está habilitado na configuração
  const isEnabled = config[itemKey as keyof DashboardConfig];
  
  if (!isEnabled) {
    console.log(`⚠️ ItemRenderer - Item ${itemKey} is disabled in config`);
    return null;
  }

  console.log(`🎯 ItemRenderer - Rendering item: ${itemKey}`, { isPublicView, sharedUserId });

  // Renderizar o componente apropriado baseado na chave
  switch (itemKey) {
    // Métricas básicas
    case 'showReceita':
      return <MetricsCards.Receita sharedUserId={sharedUserId} />;
    case 'showFaturamento':
      return <MetricsCards.Faturamento sharedUserId={sharedUserId} />;
    case 'showQuantidadeVendas':
      return <MetricsCards.QuantidadeVendas sharedUserId={sharedUserId} />;
    case 'showTicketReceita':
      return <MetricsCards.TicketReceita sharedUserId={sharedUserId} />;
    case 'showTicketFaturamento':
      return <MetricsCards.TicketFaturamento sharedUserId={sharedUserId} />;
    case 'showCashCollect':
      return <MetricsCards.CashCollect />;
    case 'showCac':
      return <MetricsCards.Cac />;
    case 'showConversion':
      return <MetricsCards.Conversion sharedUserId={sharedUserId} />;
    
    // Metas
    case 'showMetaReceita':
      return <GoalComponents.MetaReceita sharedUserId={sharedUserId} />;
    case 'showMetaFaturamento':
      return <GoalComponents.MetaFaturamento sharedUserId={sharedUserId} />;
    
    // Super Metas
    case 'showSuperMetaReceita':
      return <GoalComponents.SuperMetaReceita sharedUserId={sharedUserId} />;
    case 'showSuperMetaFaturamento':
      return <GoalComponents.SuperMetaFaturamento sharedUserId={sharedUserId} />;
    
    // Hiper Metas
    case 'showHiperMetaReceita':
      return <GoalComponents.HiperMetaReceita sharedUserId={sharedUserId} />;
    case 'showHiperMetaFaturamento':
      return <GoalComponents.HiperMetaFaturamento sharedUserId={sharedUserId} />;
    
    // Faltas
    case 'showFaltaReceita':
      return <GoalComponents.FaltaReceita sharedUserId={sharedUserId} />;
    case 'showFaltaFaturamento':
      return <GoalComponents.FaltaFaturamento sharedUserId={sharedUserId} />;
    case 'showFaltaReceitaSuper':
      return <GoalComponents.FaltaReceitaSuper sharedUserId={sharedUserId} />;
    case 'showFaltaFaturamentoSuper':
      return <GoalComponents.FaltaFaturamentoSuper sharedUserId={sharedUserId} />;
    case 'showFaltaReceitaHiper':
      return <GoalComponents.FaltaReceitaHiper sharedUserId={sharedUserId} />;
    case 'showFaltaFaturamentoHiper':
      return <GoalComponents.FaltaFaturamentoHiper sharedUserId={sharedUserId} />;
    
    // Diárias
    case 'showDiariaReceita':
      return <GoalComponents.DiariaReceita sharedUserId={sharedUserId} />;
    case 'showDiariaFaturamento':
      return <GoalComponents.DiariaFaturamento sharedUserId={sharedUserId} />;
    
    // Projeções
    case 'showProjecaoReceita':
      return <MetricsCards.ProjecaoReceita sharedUserId={sharedUserId} />;
    case 'showProjecaoFaturamento':
      return <MetricsCards.ProjecaoFaturamento sharedUserId={sharedUserId} />;
    case 'showNoShow':
      return <MetricsCards.NoShow sharedUserId={sharedUserId} />;
    
    // Gráficos de evolução
    case 'showRevenueEvolutionChart':
    case 'revenueEvolutionChart':
      return <ChartsSection.RevenueEvolutionChart sharedUserId={sharedUserId} />;
    case 'showBillingEvolutionChart':
    case 'billingEvolutionChart':
      return <ChartsSection.BillingEvolutionChart sharedUserId={sharedUserId} />;
    
    // Gráficos de performance dos vendedores
    case 'showSellerRevenueChart':
    case 'sellerRevenueChart':
      return <ChartsSection.SellerRevenueChart sharedUserId={sharedUserId} />;
    case 'showSellerBillingChart':
    case 'sellerBillingChart':
      return <ChartsSection.SellerBillingChart sharedUserId={sharedUserId} />;
    
    // Gráficos de análise temporal
    case 'showTemporalRevenueChart':
    case 'temporalRevenueChart':
      return <ChartsSection.TemporalRevenueChart sharedUserId={sharedUserId} />;
    case 'showTemporalBillingChart':
    case 'temporalBillingChart':
      return <ChartsSection.TemporalBillingChart sharedUserId={sharedUserId} />;
    
    // Tabela de performance dos closers
    case 'showClosersPerformanceTable':
      return <ChartsSection.ClosersPerformanceTable sharedUserId={sharedUserId} />;
    
    default:
      console.warn(`⚠️ ItemRenderer - Unknown item key: ${itemKey}`);
      return null;
  }
};
