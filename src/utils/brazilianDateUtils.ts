
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Função para formatar data no padrão brasileiro com fuso horário correto
export const formatDateToBrazilian = (dateString: string): string => {
  try {
    // Parse da data ISO string
    const date = parseISO(dateString);
    
    // Formatação no padrão brasileiro (dd/MM/yyyy)
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return dateString;
  }
};

// Função para formatar data e hora no padrão brasileiro
export const formatDateTimeToBrazilian = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data e hora:', error);
    return dateString;
  }
};

// Função para converter data para o formato ISO considerando fuso horário brasileiro
export const convertToUTCFromBrazil = (dateString: string): string => {
  try {
    // Criar data assumindo que é horário de Brasília (UTC-3)
    const localDate = new Date(dateString + 'T00:00:00');
    
    // Ajustar para UTC considerando o offset brasileiro
    const utcDate = new Date(localDate.getTime() + (3 * 60 * 60 * 1000));
    
    return utcDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('Erro ao converter data para UTC:', error);
    return dateString;
  }
};

// Função para obter a data atual no fuso horário brasileiro
export const getCurrentBrazilianDate = (): Date => {
  const now = new Date();
  // Ajustar para o fuso horário brasileiro (UTC-3)
  const brazilTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
  return brazilTime;
};

// Função para verificar se uma data está atrasada considerando o fuso brasileiro
export const isOverdueBrazilian = (dueDate: string): boolean => {
  try {
    const due = parseISO(dueDate);
    const today = getCurrentBrazilianDate();
    
    // Resetar horas para comparar apenas as datas
    const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    return dueDay < todayDay;
  } catch (error) {
    console.error('Erro ao verificar se está atrasado:', error);
    return false;
  }
};
