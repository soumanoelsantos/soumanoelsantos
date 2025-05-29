
import { useState, useRef } from 'react';
import { useDevAI } from '../DevAIContext';
import { useErrorHandler } from './useErrorHandler';
import { callDeepseekApi } from '@/utils/swot/ai/deepseekClient';
import { extractCodeFromResponse } from '../utils/codeExtraction';
import { determineIfIncremental } from '../utils/incrementalDetection';
import { createShortSummary } from '../utils/messageProcessing';
import { generatePrompt } from '../utils/promptGeneration';

export const useChatInterface = () => {
  const { messages, addMessage, updateCodeIncremental, isLoading, setIsLoading, currentProject, generatedCode } = useDevAI();
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const { handleError } = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim() || (selectedImage ? 'Imagem enviada' : '');
    setInput('');
    
    // Salvar o estado atual do código na mensagem do usuário
    const currentProjectState = generatedCode || '';
    addMessage(userMessage, 'user', selectedImage || undefined, currentProjectState);
    
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      // SEMPRE forçar modo incremental se há código existente
      const hasExistingCode = generatedCode && generatedCode.trim().length > 100;
      
      console.log('🔍 Verificação de código existente:');
      console.log('- Tem código:', !!generatedCode);
      console.log('- Tamanho do código:', generatedCode?.length || 0);
      console.log('- É código significativo:', hasExistingCode);
      console.log('- Projeto atual:', currentProject?.name);
      
      // Se há código existente, SEMPRE usar modo incremental
      const isIncremental = hasExistingCode ? true : determineIfIncremental(userMessage, generatedCode);
      
      console.log('🚨 DECISÃO FINAL:');
      console.log('- Código existente detectado:', hasExistingCode);
      console.log('- Modo incremental OBRIGATÓRIO:', isIncremental);
      console.log('- Preservar layout:', isIncremental);
      
      const prompt = generatePrompt(
        userMessage,
        currentProject,
        generatedCode,
        isIncremental,
        !!currentImage,
        input.trim()
      );

      console.log('📤 Enviando prompt para API...');
      console.log('📝 Prompt gerado:', prompt.substring(0, 500) + '...');
      
      const response = await callDeepseekApi(prompt);
      
      if (response) {
        console.log('📥 Resposta recebida da API:', response.substring(0, 200) + '...');
        
        // Extrair código da resposta com logs detalhados
        const extractedCode = extractCodeFromResponse(response);
        
        if (extractedCode) {
          console.log('💻 Código extraído com sucesso, tamanho:', extractedCode.length);
          console.log('🔍 Primeiros 300 chars do código extraído:', extractedCode.substring(0, 300));
          console.log('🔄 Atualizando código com modo incremental:', isIncremental);
          
          // Usar a função incremental para preservar layout
          updateCodeIncremental(extractedCode, isIncremental);
          
          // Mostrar apenas resumo curto no chat
          const summary = createShortSummary(response);
          addMessage(summary, 'assistant');
        } else {
          console.log('⚠️ Nenhum código extraído da resposta');
          console.log('📄 Resposta completa para análise:', response);
          
          // Se não há código, mostrar resposta completa
          const summary = createShortSummary(response);
          addMessage(summary, 'assistant');
        }
      } else {
        console.error('❌ Resposta vazia da API');
        const error = new Error('Resposta vazia da API');
        handleError(error, 'api');
        addMessage('Erro ao processar solicitação. Tente novamente.', 'assistant');
      }
    } catch (error) {
      console.error('❌ Erro ao chamar DeepSeek API:', error);
      handleError(error, 'api');
      addMessage('Erro de conexão. Verifique sua internet e tente novamente.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (file: File, preview: string) => {
    setSelectedImage({ file, preview });
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return {
    messages,
    input,
    setInput,
    selectedImage,
    isLoading,
    messagesStartRef,
    handleSubmit,
    handleImageSelect,
    handleRemoveImage
  };
};
