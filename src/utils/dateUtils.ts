
// Re-exportar as funções brasileiras como padrão
export { 
  formatDateToBrazilian, 
  formatDateTimeToBrazilian, 
  convertToUTCFromBrazil, 
  getCurrentBrazilianDate, 
  isOverdueBrazilian 
} from './brazilianDateUtils';

// Funções de compatibilidade para código existente
export const getBrazilianDate = () => {
  const now = new Date();
  // Ajustar para o fuso horário brasileiro (UTC-3)
  const brazilTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
  return brazilTime.toISOString().split('T')[0];
};

export const formatToBrazilianTimezone = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Ajustar para fuso horário brasileiro (UTC-3)
    const brazilDate = new Date(date.getTime() - (3 * 60 * 60 * 1000));
    
    return brazilDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return dateString;
  }
};
