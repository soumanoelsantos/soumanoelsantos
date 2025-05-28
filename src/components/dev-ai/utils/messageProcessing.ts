
export const createShortSummary = (message: string): string => {
  // Remove código da mensagem e cria resumo curto
  const cleanMessage = message
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<!DOCTYPE html>[\s\S]*<\/html>/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Se ainda há conteúdo, pega apenas as primeiras palavras
  if (cleanMessage && cleanMessage.length > 50) {
    return cleanMessage.substring(0, 47) + '...';
  }
  
  return cleanMessage || 'Código gerado!';
};
