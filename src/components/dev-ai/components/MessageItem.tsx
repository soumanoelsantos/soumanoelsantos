
import React, { useState } from 'react';
import { User, Bot, CheckCircle, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjectHistory } from '../ProjectHistoryContext';
import { useDevAI } from '../DevAIContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: { file: File; preview: string };
  projectState?: string; // Código do projeto no momento da mensagem
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const projectHistory = useProjectHistory();
  const { setGeneratedCode } = useDevAI();
  const [isExpanded, setIsExpanded] = useState(false);

  // Definir limite de caracteres para mostrar "Ler mais"
  const CHARACTER_LIMIT = 300;
  const shouldShowReadMore = message.content.length > CHARACTER_LIMIT;
  const displayContent = shouldShowReadMore && !isExpanded 
    ? message.content.substring(0, CHARACTER_LIMIT) + '...'
    : message.content;

  const handleRestore = () => {
    if (message.projectState && setGeneratedCode) {
      console.log(`🔄 Restaurando projeto para estado da mensagem: ${message.id}`);
      console.log(`📝 Conteúdo da mensagem: ${message.content.substring(0, 50)}...`);
      console.log(`💻 Tamanho do código a restaurar: ${message.projectState.length} caracteres`);
      
      setGeneratedCode(message.projectState);
      
      // Opcional: adicionar uma mensagem de confirmação
      console.log('✅ Projeto restaurado com sucesso');
    } else {
      console.warn('⚠️ Não foi possível restaurar: estado do projeto não disponível');
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex w-full ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.type === 'user' ? 'bg-blue-500' : 'bg-gray-500'
        }`}>
          {message.type === 'user' ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-white" />
          )}
        </div>
        
        <div className="flex flex-col space-y-2 min-w-0">
          {message.image && (
            <div className="flex-shrink-0">
              <img
                src={message.image.preview}
                alt="Imagem enviada"
                className="max-w-40 h-24 object-cover rounded-lg border shadow-sm"
              />
            </div>
          )}
          
          <div className={`px-4 py-3 rounded-lg break-words ${
            message.type === 'user' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}>
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{displayContent}</p>
            
            {/* Botão "Ler mais" / "Ler menos" */}
            {shouldShowReadMore && (
              <Button
                onClick={toggleExpanded}
                variant="ghost"
                size="sm"
                className={`mt-2 h-6 px-2 py-1 text-xs ${
                  message.type === 'user'
                    ? 'text-blue-100 hover:text-blue-50 hover:bg-blue-600/50'
                    : 'text-gray-600 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Ler menos
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Ler mais
                  </>
                )}
              </Button>
            )}
            
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-opacity-20 border-current">
              <p className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              
              {/* Botão de restaurar para mensagens do usuário que têm estado do projeto */}
              {message.type === 'user' && message.projectState && (
                <Button
                  onClick={handleRestore}
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 py-1 text-xs text-blue-100 hover:text-blue-50 hover:bg-blue-600/50 ml-2"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Restaurar
                </Button>
              )}
            </div>
            
            {/* Indicador de preview atualizado para mensagens do assistente */}
            {message.type === 'assistant' && (
              <div className="flex items-center mt-2 pt-2 border-t border-green-200">
                <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-xs text-green-600">Preview atualizado</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
