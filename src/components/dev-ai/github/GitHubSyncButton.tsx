
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { GitHubService, GitHubIntegration } from '@/services/githubService';
import { Github, Upload, Settings, Loader2 } from 'lucide-react';
import GitHubIntegrationDialog from './GitHubIntegrationDialog';

interface GitHubSyncButtonProps {
  projectId: string;
  projectName: string;
  code: string;
}

const GitHubSyncButton: React.FC<GitHubSyncButtonProps> = ({
  projectId,
  projectName,
  code
}) => {
  const [integration, setIntegration] = useState<GitHubIntegration | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadIntegration();
  }, [projectId]);

  const loadIntegration = async () => {
    if (!projectId) return;
    
    setIsLoading(true);
    try {
      const data = await GitHubService.getProjectIntegration(projectId);
      setIntegration(data);
    } catch (error) {
      console.error('Error loading GitHub integration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectFiles = () => {
    // Preparar todos os arquivos do projeto
    const files = [
      {
        path: 'README.md',
        content: `# ${projectName}

Projeto criado com DevAI

## Descrição
Este projeto foi gerado automaticamente usando a plataforma DevAI.

## Estrutura do Projeto
- \`src/\` - Código fonte da aplicação
- \`public/\` - Arquivos públicos
- \`supabase/\` - Configurações do Supabase

## Como executar
\`\`\`bash
npm install
npm run dev
\`\`\`

Gerado em: ${new Date().toLocaleString()}`
      },
      {
        path: 'package.json',
        content: JSON.stringify({
          "name": projectName.toLowerCase().replace(/\s+/g, '-'),
          "private": true,
          "version": "0.0.0",
          "type": "module",
          "scripts": {
            "dev": "vite",
            "build": "tsc && vite build",
            "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
            "preview": "vite preview"
          },
          "dependencies": {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "@supabase/supabase-js": "^2.39.3",
            "lucide-react": "^0.363.0",
            "tailwindcss": "^3.4.1"
          },
          "devDependencies": {
            "@types/react": "^18.2.56",
            "@types/react-dom": "^18.2.19",
            "@typescript-eslint/eslint-plugin": "^7.0.2",
            "@typescript-eslint/parser": "^7.0.2",
            "@vitejs/plugin-react": "^4.2.1",
            "autoprefixer": "^10.4.17",
            "eslint": "^8.56.0",
            "eslint-plugin-react-hooks": "^4.6.0",
            "eslint-plugin-react-refresh": "^0.4.5",
            "postcss": "^8.4.35",
            "typescript": "^5.2.2",
            "vite": "^5.1.4"
          }
        }, null, 2)
      },
      {
        path: 'index.html',
        content: `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
      },
      {
        path: 'vite.config.ts',
        content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`
      },
      {
        path: 'tailwind.config.js',
        content: `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
      },
      {
        path: 'postcss.config.js',
        content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
      },
      {
        path: 'tsconfig.json',
        content: JSON.stringify({
          "compilerOptions": {
            "target": "ES2020",
            "useDefineForClassFields": true,
            "lib": ["ES2020", "DOM", "DOM.Iterable"],
            "module": "ESNext",
            "skipLibCheck": true,
            "moduleResolution": "bundler",
            "allowImportingTsExtensions": true,
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "react-jsx",
            "strict": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "noFallthroughCasesInSwitch": true,
            "baseUrl": ".",
            "paths": {
              "@/*": ["./src/*"]
            }
          },
          "include": ["src"],
          "references": [{ "path": "./tsconfig.node.json" }]
        }, null, 2)
      },
      {
        path: 'src/main.tsx',
        content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
      },
      {
        path: 'src/App.tsx',
        content: code || `import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">${projectName}</h1>
        <p className="text-gray-600">
          Projeto criado com DevAI - Uma plataforma para desenvolvimento rápido de aplicações.
        </p>
      </div>
    </div>
  )
}

export default App`
      },
      {
        path: 'src/index.css',
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}`
      },
      {
        path: '.gitignore',
        content: `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local`
      }
    ];

    return files;
  };

  const handleSync = async () => {
    if (!integration) {
      toast({
        variant: "destructive",
        title: "Não é possível sincronizar",
        description: "Configure a integração com GitHub primeiro."
      });
      return;
    }

    setIsSyncing(true);
    try {
      const files = getProjectFiles();
      const commitMessage = `DevAI Project Sync - ${new Date().toLocaleString()}`;
      
      const [owner, repo] = integration.repository_name.split('/');
      
      await GitHubService.pushCode(
        integration.github_token,
        owner,
        repo,
        integration.branch_name,
        files,
        commitMessage
      );

      toast({
        title: "Projeto sincronizado!",
        description: `Todo o projeto foi enviado para o repositório ${integration.repository_name}.`
      });
      
    } catch (error) {
      console.error('Error syncing project:', error);
      toast({
        variant: "destructive",
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar o projeto. Verifique sua conexão e tente novamente."
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleConfigure = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    loadIntegration();
  };

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Carregando...
      </Button>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        {integration ? (
          <>
            <Button
              onClick={handleSync}
              disabled={isSyncing}
              size="sm"
              className="flex items-center space-x-2"
            >
              {isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              <span>{isSyncing ? 'Sincronizando...' : 'Sync GitHub'}</span>
            </Button>
            
            <Button
              onClick={handleConfigure}
              variant="outline"
              size="sm"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            onClick={handleConfigure}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Github className="h-4 w-4" />
            <span>Conectar GitHub</span>
          </Button>
        )}
      </div>

      <GitHubIntegrationDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        projectId={projectId}
        projectName={projectName}
      />
    </>
  );
};

export default GitHubSyncButton;
