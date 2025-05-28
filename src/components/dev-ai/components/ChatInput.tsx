
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import ImageUpload from '../ImageUpload';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  selectedImage: { file: File; preview: string } | null;
  onImageSelect: (file: File, preview: string) => void;
  onRemoveImage: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  selectedImage,
  onImageSelect,
  onRemoveImage,
  onSubmit,
  isLoading
}) => {
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        
        if (file) {
          // Verificar tamanho do arquivo (5MB máximo)
          if (file.size > 5 * 1024 * 1024) {
            console.warn('Imagem muito grande (máximo 5MB)');
            return;
          }

          const reader = new FileReader();
          reader.onload = () => {
            onImageSelect(file, reader.result as string);
          };
          reader.readAsDataURL(file);
        }
        break;
      }
    }
  };

  return (
    <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-white">
      <form onSubmit={onSubmit}>
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={handlePaste}
              placeholder="Descreva o que você quer desenvolver ou cole uma imagem (Ctrl+V)..."
              className="resize-none text-sm"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
            />
            {selectedImage && (
              <div className="mt-2">
                <ImageUpload
                  onImageSelect={onImageSelect}
                  selectedImage={selectedImage}
                  onRemoveImage={onRemoveImage}
                />
              </div>
            )}
          </div>
          <div className="flex items-end space-x-1">
            {!selectedImage && (
              <ImageUpload
                onImageSelect={onImageSelect}
                selectedImage={selectedImage}
                onRemoveImage={onRemoveImage}
              />
            )}
            <Button 
              type="submit" 
              disabled={isLoading || (!input.trim() && !selectedImage)}
              size="sm"
              className="h-8 px-3"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
