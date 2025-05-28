
export const determineIfIncremental = (userMessage: string, existingCode: string): boolean => {
  const messageLower = userMessage.toLowerCase();
  
  console.log('🔍 Analisando mensagem para detecção incremental:', messageLower);
  console.log('📋 Código existente presente:', !!existingCode && existingCode.length > 100);
  
  // Se há código existente significativo (mais de 100 caracteres), SEMPRE é incremental
  if (existingCode && existingCode.trim().length > 100) {
    console.log('✅ CÓDIGO EXISTENTE DETECTADO - MODO INCREMENTAL FORÇADO SEMPRE');
    return true;
  }
  
  // Palavras que indicam SUBSTITUIÇÃO COMPLETA (muito restritivas)
  const replaceKeywords = [
    'recrie do zero', 'começar do zero', 'apagar tudo', 'limpar tudo',
    'novo projeto completamente diferente', 'substitua tudo e recrie'
  ];
  
  // Se tem palavras de substituição explícitas E não há código existente
  const hasReplaceWords = replaceKeywords.some(keyword => messageLower.includes(keyword));
  if (hasReplaceWords && (!existingCode || existingCode.trim().length < 100)) {
    console.log('🔄 Detectado comando de substituição completa (sem código existente)');
    return false;
  }
  
  // QUALQUER outra situação com código existente é incremental
  console.log('📄 Forçando modo incremental para preservar layout');
  return true;
};
