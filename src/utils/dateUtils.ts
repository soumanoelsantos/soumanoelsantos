
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Fuso horário brasileiro (UTC-3)
const BRAZIL_TIMEZONE = 'America/Sao_Paulo';

export const formatToBrazilianTimezone = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: BRAZIL_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(dateObj);
};

export const formatDateToBrazilian = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: BRAZIL_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(dateObj);
};

export const formatTimeToBrazilian = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: BRAZIL_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

export const getBrazilianDateTime = (): string => {
  const now = new Date();
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: BRAZIL_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(now);
};

export const getBrazilianDate = (date?: string | Date): string => {
  // Se uma data específica for fornecida, formatá-la
  if (date) {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: BRAZIL_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(dateObj);
  }
  
  // Caso contrário, usar a data atual
  const now = new Date();
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: BRAZIL_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(now);
};

// Converte data brasileira para formato ISO para envio ao banco
export const convertBrazilianDateToISO = (brazilianDate: string): string => {
  const [day, month, year] = brazilianDate.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

// Converte data ISO para formato brasileiro
export const convertISOToBrazilianDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
};
