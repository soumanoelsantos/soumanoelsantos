
export interface MetricItem {
  key: string;
  label: string;
  category: string;
}

export const AVAILABLE_METRICS: MetricItem[] = [
  { key: 'showConversion', label: 'Taxa de Conversão', category: 'basic' },
  { key: 'showRevenue', label: 'Receita', category: 'basic' },
  { key: 'showTicketFaturamento', label: 'Ticket Médio Faturamento', category: 'ticket' },
  { key: 'showTicketReceita', label: 'Ticket Médio Receita', category: 'ticket' },
  { key: 'showFaltaFaturamento', label: 'Falta Faturamento', category: 'gap' },
  { key: 'showFaltaReceita', label: 'Falta Receita', category: 'gap' },
  { key: 'showDiariaReceita', label: 'Diária Receita', category: 'daily' },
  { key: 'showDiariaFaturamento', label: 'Diária Faturamento', category: 'daily' },
  { key: 'showSuperMetaFaturamento', label: 'Super Meta Faturamento', category: 'goal' },
  { key: 'showSuperMetaReceita', label: 'Super Meta Receita', category: 'goal' },
  { key: 'showHiperMetaFaturamento', label: 'Hiper Meta Faturamento', category: 'goal' },
  { key: 'showHiperMetaReceita', label: 'Hiper Meta Receita', category: 'goal' },
  { key: 'showFaltaReceitaSuper', label: 'Falta Receita Super', category: 'gap' },
  { key: 'showFaltaReceitaHiper', label: 'Falta Receita Hiper', category: 'gap' },
  { key: 'showFaltaFaturamentoSuper', label: 'Falta Faturamento Super', category: 'gap' },
  { key: 'showFaltaFaturamentoHiper', label: 'Falta Faturamento Hiper', category: 'gap' },
  { key: 'showMetaFaturamento', label: 'Meta Faturamento', category: 'goal' },
  { key: 'showMetaReceita', label: 'Meta Receita', category: 'goal' },
  { key: 'showFaturamento', label: 'Faturamento', category: 'basic' },
  { key: 'showReceita', label: 'Receita', category: 'basic' },
  { key: 'showQuantidadeVendas', label: 'Quantidade de Vendas', category: 'basic' },
  { key: 'showCashCollect', label: 'Cash Collect', category: 'basic' },
  { key: 'showCac', label: 'CAC', category: 'basic' },
  { key: 'showProjecaoReceita', label: 'Projeção Receita', category: 'projection' },
  { key: 'showProjecaoFaturamento', label: 'Projeção Faturamento', category: 'projection' },
  { key: 'showNoShow', label: 'No Show', category: 'basic' }
];
