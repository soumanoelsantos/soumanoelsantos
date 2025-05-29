
import { extractFromCodeBlocks, extractFromReactPatterns, generateContextAwareComponent } from './extraction/extractionStrategies';

export const extractCodeFromResponse = (response: string) => {
  console.log('🔍 Iniciando extração de código da resposta...');
  console.log('📄 Resposta recebida (primeiros 500 chars):', response.substring(0, 500));
  
  // 1. Tentar extrair de blocos de código explícitos
  const codeBlockResult = extractFromCodeBlocks(response);
  if (codeBlockResult) {
    return codeBlockResult;
  }

  // 2. Tentar extrair de padrões React no texto
  const reactPatternResult = extractFromReactPatterns(response);
  if (reactPatternResult) {
    return reactPatternResult;
  }

  // 3. Gerar componente baseado no contexto
  return generateContextAwareComponent(response);
};
