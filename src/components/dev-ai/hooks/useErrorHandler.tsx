
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
ERRO DETECTADO NO SISTEMA:
Tipo: ${error.type}
Mensagem: ${error.message}
Detalhes: ${error.details}

CÓDIGO ATUAL:
${generatedCode || 'Nenhum código gerado ainda'}

INSTRUÇÕES:
- Analise o erro e identifique a causa
- Corrija o problema no código
- Mantenha toda a funcionalidade existente
- Retorne apenas o código HTML corrigido
- Não adicione explicações, apenas o código

Por favor, corrija este erro e retorne o código HTML funcional.
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
        description: 'Tente fazer a correção manualmente ou contacte o suporte'
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
