
import React, { useEffect } from 'react';

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
  useEffect(() => {
    if (iframeRef.current && previewHtml) {
      try {
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (doc) {
          doc.open();
          doc.write(previewHtml);
          doc.close();
          
          // Adicionar listener para erros JavaScript no iframe
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
