// Re-exportar as funções brasileiras como padrão
export { 
  formatDateToBrazilian, 
  formatDateTimeToBrazilian, 
  convertToUTCFromBrazil, 
  getCurrentBrazilianDate, 
  isOverdueBrazilian 
} from './brazilianDateUtils';

// Funções de compatibilidade para código existente
export const getBrazilianDate = (dateString: string): string => {
  try {
    // Se a data já está no formato brasileiro DD/MM/YYYY, retornar como está
    if (dateString.includes('/')) {
      return dateString;
    }
    
    // Converter data ISO para formato brasileiro com fuso horário do Brasil
    const date = new Date(dateString + 'T00:00:00-03:00'); // Força horário de Brasília
    
    if (isNaN(date.getTime())) {
      console.warn('Data inválida recebida:', dateString);
      return dateString;
    }
    
    // Formatar para DD/MM/YYYY usando o fuso horário brasileiro
    return date.toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data brasileira:', error);
    return dateString;
  }
};

export const formatBrazilianDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.warn('Data/hora inválida recebida:', dateString);
      return dateString;
    }
    
    // Formatar para DD/MM/YYYY HH:mm usando o fuso horário brasileiro
    return date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar data/hora brasileira:', error);
    return dateString;
  }
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
