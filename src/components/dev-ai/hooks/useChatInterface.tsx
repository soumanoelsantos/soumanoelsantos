
import { useState, useRef, useEffect } from 'react';
import { useDevAI } from '../DevAIContext';
import { useProjectHistory } from '../ProjectHistoryContext';
import { callDeepseekApi } from '@/utils/swot/ai/deepseekClient';
import { extractCodeFromResponse } from '../utils/codeExtraction';
import { determineIfIncremental } from '../utils/incrementalDetection';
import { createShortSummary } from '../utils/messageProcessing';
import { generatePrompt } from '../utils/promptGeneration';

export const useChatInterface = () => {
  const { messages, addMessage, updateCodeIncremental, isLoading, setIsLoading, currentProject, generatedCode } = useDevAI();
  const projectHistory = useProjectHistory();
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    messagesStartRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim() || (selectedImage ? 'Imagem enviada' : '');
    setInput('');
    addMessage(userMessage, 'user', selectedImage || undefined);
    
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
      console.log('- Contexto de histórico disponível:', !!projectHistory);
      
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

      console.log('📤 Enviando prompt:', prompt.substring(0, 300) + '...');
      
      const response = await callDeepseekApi(prompt);
      
      if (response) {
        console.log('📥 Resposta recebida da API:', response.substring(0, 200) + '...');
        
        // Extrair código da resposta
        const extractedCode = extractCodeFromResponse(response);
        
        if (extractedCode) {
          console.log('💻 Código extraído com sucesso, tamanho:', extractedCode.length);
          console.log('🔄 Atualizando com preservação de layout - Incremental:', isIncremental);
          
          // Usar a função incremental para preservar layout
          updateCodeIncremental(extractedCode, isIncremental);
          
          // GARANTIR que o histórico seja salvo - com verificação de segurança
          if (projectHistory && projectHistory.addVersion && currentProject) {
            console.log('📝 Salvando versão no histórico...');
            const summary = createShortSummary(response);
            
            try {
              projectHistory.addVersion(extractedCode, summary, userMessage);
              console.log('✅ Versão salva no histórico com sucesso');
            } catch (historyError) {
              console.error('❌ Erro ao salvar no histórico:', historyError);
            }
          } else {
            console.warn('⚠️ Não foi possível salvar no histórico:');
            console.warn('- projectHistory disponível:', !!projectHistory);
            console.warn('- addVersion disponível:', !!(projectHistory?.addVersion));
            console.warn('- currentProject disponível:', !!currentProject);
          }
          
          // Mostrar apenas resumo curto no chat
          const summary = createShortSummary(response);
          addMessage(summary, 'assistant');
        } else {
          console.log('⚠️ Nenhum código extraído, mostrando resposta completa');
          // Se não há código, mostrar resposta completa
          const summary = createShortSummary(response);
          addMessage(summary, 'assistant');
        }
      } else {
        console.error('❌ Resposta vazia da API');
        addMessage('Erro ao processar solicitação. Tente novamente.', 'assistant');
      }
    } catch (error) {
      console.error('❌ Erro ao chamar DeepSeek API:', error);
      addMessage('Erro de conexão. Tente novamente.', 'assistant');
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
