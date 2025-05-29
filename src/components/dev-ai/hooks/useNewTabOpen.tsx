
import { useToast } from '@/hooks/use-toast';

export const useNewTabOpen = () => {
  const { toast } = useToast();

  const openInNewTab = (code: string) => {
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(`
        <html>
          <head>
            <title>React Code</title>
            <style>
              body { 
                font-family: 'Fira Code', 'Courier New', monospace; 
                margin: 20px; 
                background: #1e1e1e; 
                color: #d4d4d4;
              }
              pre { 
                white-space: pre-wrap; 
                word-wrap: break-word;
                background: #1e1e1e;
                padding: 20px;
                border-radius: 8px;
                overflow-x: auto;
              }
            </style>
          </head>
          <body>
            <h2>Código React Gerado</h2>
            <pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
          </body>
        </html>
      `);
      newTab.document.close();
      toast({
        title: "Nova aba aberta!",
        description: "O código React foi aberto em uma nova aba.",
      });
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível abrir uma nova aba. Verifique se o bloqueador de pop-ups está desabilitado.",
        variant: "destructive"
      });
    }
  };

  return { openInNewTab };
};
