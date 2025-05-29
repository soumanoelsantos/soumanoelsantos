
import React from 'react';
import { User, Bot, CheckCircle, RotateCcw } from 'lucide-react';
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

  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
          message.type === 'user' ? 'bg-blue-500' : 'bg-gray-500'
        }`}>
          {message.type === 'user' ? (
            <User className="h-3 w-3 text-white" />
          ) : (
            <Bot className="h-3 w-3 text-white" />
          )}
        </div>
        <div className="flex flex-col space-y-1">
          {message.image && (
            <img
              src={message.image.preview}
              alt="Imagem enviada"
              className="max-w-32 h-20 object-cover rounded border"
            />
          )}
          <div className={`px-3 py-2 rounded-lg ${
            message.type === 'user' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}>
            <p className="text-xs whitespace-pre-wrap">{message.content}</p>
            
            {/* Botão de restaurar apenas para mensagens do usuário que têm estado do projeto */}
            {message.type === 'user' && message.projectState && (
              <div className="mt-2 pt-2 border-t border-blue-400/30">
                <Button
                  onClick={handleRestore}
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 py-1 text-xs text-blue-100 hover:text-blue-50 hover:bg-blue-600/50"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Restaurar
                </Button>
              </div>
            )}
            
            {message.type === 'assistant' && (
              <div className="flex items-center mt-1 text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span className="text-xs">Preview atualizado</span>
              </div>
            )}
            <p className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
