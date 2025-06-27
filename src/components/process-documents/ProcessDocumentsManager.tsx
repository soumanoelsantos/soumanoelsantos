
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FolderPlus, Plus, Folder, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';
import { ProcessFolder } from '@/types/processDocuments';
import DocumentsList from './DocumentsList';
import FoldersList from './FoldersList';
import CreateDocumentDialog from './CreateDocumentDialog';
import CreateFolderDialog from './CreateFolderDialog';
import FolderView from './FolderView';

const ProcessDocumentsManager = () => {
  const { documents, folders, isLoading, getRootFolders } = useProcessDocuments();
  const [isCreateDocumentOpen, setIsCreateDocumentOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<ProcessFolder | null>(null);
  const navigate = useNavigate();

  const handleFolderClick = (folder: ProcessFolder) => {
    setSelectedFolder(folder);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
  };

  const handleBackToMembers = () => {
    navigate('/membros');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Processos Documentados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            Carregando processos...
          </div>
        </CardContent>
      </Card>
    );
  }

  // Se uma pasta foi selecionada, mostrar a visualização da pasta
  if (selectedFolder) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToFolders}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para Pastas
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToMembers}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Área de Membros
              </Button>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              {selectedFolder.name}
            </CardTitle>
            {selectedFolder.description && (
              <CardDescription>
                {selectedFolder.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <FolderView 
              folder={selectedFolder}
              documents={documents}
              folders={folders}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Processos Documentados
              </CardTitle>
              <CardDescription>
                Crie e gerencie documentos de processos da sua empresa como playbooks de vendas, 
                diretrizes e padronizações. Compartilhe com sua equipe através de links públicos.
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={handleBackToMembers}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Área de Membros
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button onClick={() => setIsCreateDocumentOpen(true)} className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Novo Documento
            </Button>
            <Button variant="outline" onClick={() => setIsCreateFolderOpen(true)} className="flex-1">
              <FolderPlus className="h-4 w-4 mr-2" />
              Nova Pasta
            </Button>
          </div>

          <Tabs defaultValue="folders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="folders" className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                Pastas ({folders.length})
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentos ({documents.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="folders" className="space-y-4">
              <FoldersList 
                folders={folders} 
                onFolderClick={handleFolderClick}
              />
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <DocumentsList documents={documents} folders={folders} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <CreateDocumentDialog 
        isOpen={isCreateDocumentOpen}
        onClose={() => setIsCreateDocumentOpen(false)}
        folders={folders}
      />

      <CreateFolderDialog 
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        folders={folders}
      />
    </div>
  );
};

export default ProcessDocumentsManager;
