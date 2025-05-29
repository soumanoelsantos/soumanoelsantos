
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Code } from 'lucide-react';

interface PreviewFrameProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  previewHtml: string;
  onLoad: () => void;
  onError?: (error: any) => void;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ 
  iframeRef, 
  previewHtml, 
  onLoad,
  onError 
}) => {
  // Para código React, mostrar apenas uma mensagem informativa
  if (previewHtml && (previewHtml.includes('import React') || previewHtml.includes('export default'))) {
    return (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Code className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Código React Gerado
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Este é um componente React. Use a visualização de código para ver o código fonte.
          </p>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-blue-800 text-sm">
              💡 O código React está sendo exibido na visualização de código ao lado.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Para outros tipos de código, manter o iframe
  useEffect(() => {
    if (iframeRef.current && previewHtml) {
      try {
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (doc) {
          doc.open();
          doc.write(previewHtml);
          doc.close();
          
          if (iframe.contentWindow) {
            iframe.contentWindow.addEventListener('error', (error) => {
              console.error('Erro JavaScript no preview:', error);
              onError?.(error);
            });
            
            iframe.contentWindow.addEventListener('unhandledrejection', (error) => {
              console.error('Promise rejeitada no preview:', error);
              onError?.(error);
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar HTML no iframe:', error);
        onError?.(error);
      }
    }
  }, [previewHtml, iframeRef, onError]);

  return (
    <div className="w-full h-full bg-white">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Preview"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        onLoad={onLoad}
        onError={(e) => {
          console.error('Erro no iframe:', e);
          onError?.(e);
        }}
      />
    </div>
  );
};

export default PreviewFrame;
