
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useDevAI } from '../DevAIContext';
import { callDeepseekApi } from '@/utils/swot/ai/deepseekClient';
import { extractCodeFromResponse } from '../utils/codeExtraction';

export interface DevAIError {
  id: string;
  type: 'api' | 'code' | 'network' | 'validation' | 'unknown';
  message: string;
  details?: string;
  timestamp: Date;
  canAutoFix?: boolean;
}

export const useErrorHandler = () => {
  const [currentError, setCurrentError] = useState<DevAIError | null>(null);
  const [isFixing, setIsFixing] = useState(false);
  const { generatedCode, updateCodeIncremental, currentProject } = useDevAI();

  const handleError = useCallback((error: any, type: DevAIError['type'] = 'unknown') => {
    console.error('🚨 Erro capturado:', error);
    
    const errorObj: DevAIError = {
      id: Date.now().toString(),
      type,
      message: error?.message || 'Erro desconhecido',
      details: error?.stack || JSON.stringify(error),
      timestamp: new Date(),
      canAutoFix: type === 'code' || type === 'api'
    };

    setCurrentError(errorObj);

    // Mostrar toast de erro
    toast.error(errorObj.message, {
      description: 'Clique no botão "Corrigir" para tentar uma correção automática',
      duration: 10000,
      action: errorObj.canAutoFix ? {
        label: 'Corrigir',
        onClick: () => autoFixError(errorObj)
      } : undefined
    });

    return errorObj;
  }, []);

  const autoFixError = useCallback(async (error: DevAIError) => {
    if (!error.canAutoFix || isFixing) return;

    setIsFixing(true);
    console.log('🔧 Iniciando correção automática para:', error.message);

    try {
      const fixPrompt = `
🚨 CORREÇÃO DE ERRO - ESTRUTURA REACT OBRIGATÓRIA 🚨

ERRO DETECTADO:
Tipo: ${error.type}
Mensagem: ${error.message}
Detalhes: ${error.details}

CÓDIGO PROBLEMÁTICO:
${generatedCode || 'Nenhum código gerado ainda'}

INSTRUÇÕES OBRIGATÓRIAS DE CORREÇÃO:
1. SEMPRE crie páginas React separadas (.tsx) com TypeScript
2. SEMPRE use React Router para navegação entre páginas
3. JAMAIS crie um HTML único com múltiplas seções
4. Use a estrutura de pastas: src/pages/ para páginas principais
5. Crie componentes reutilizáveis em: src/components/
6. Configure roteamento no App.tsx
7. Use navegação com Link do react-router-dom
8. TODOS os textos devem estar em PORTUGUÊS BRASILEIRO

FORMATO DE RESPOSTA OBRIGATÓRIO:
- Crie arquivos .tsx separados para cada página
- Configure as rotas no App.tsx
- Use componentes React funcionais com TypeScript
- Implemente navegação adequada com react-router-dom
- Use Tailwind CSS para estilização
- Garanta que o código seja válido e funcional
- Use português brasileiro em todos os textos

Por favor, corrija o erro e retorne APENAS código React/TypeScript válido seguindo essas diretrizes.
      `;

      toast.loading('Corrigindo erro automaticamente...', {
        id: 'auto-fix'
      });

      const response = await callDeepseekApi(fixPrompt);
      
      if (response) {
        const fixedCode = extractCodeFromResponse(response);
        
        if (fixedCode && fixedCode !== generatedCode) {
          updateCodeIncremental(fixedCode, true);
          
          setCurrentError(null);
          
          toast.success('Erro corrigido automaticamente!', {
            id: 'auto-fix',
            description: 'O código foi atualizado com a correção'
          });
          
          console.log('✅ Correção automática concluída');
        } else {
          throw new Error('Não foi possível extrair código corrigido da resposta');
        }
      } else {
        throw new Error('Resposta vazia da API de correção');
      }
    } catch (fixError) {
      console.error('❌ Erro na correção automática:', fixError);
      
      toast.error('Falha na correção automática', {
        id: 'auto-fix',
        description: 'Tente fazer a correção manualmente ou entre em contato com o suporte'
      });
    } finally {
      setIsFixing(false);
    }
  }, [generatedCode, updateCodeIncremental, isFixing]);

  const clearError = useCallback(() => {
    setCurrentError(null);
  }, []);

  const reportError = useCallback((errorMessage: string, errorType: DevAIError['type'] = 'unknown') => {
    const error = new Error(errorMessage);
    return handleError(error, errorType);
  }, [handleError]);

  return {
    currentError,
    isFixing,
    handleError,
    autoFixError,
    clearError,
    reportError
  };
};
