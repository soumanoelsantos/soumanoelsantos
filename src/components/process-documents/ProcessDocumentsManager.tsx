
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FolderPlus, Plus, Folder } from 'lucide-react';
import { useProcessDocuments } from '@/hooks/useProcessDocuments';
import DocumentsList from './DocumentsList';
import FoldersList from './FoldersList';
import CreateDocumentDialog from './CreateDocumentDialog';
import CreateFolderDialog from './CreateFolderDialog';

const ProcessDocumentsManager = () => {
  const { documents, folders, isLoading } = useProcessDocuments();
  const [isCreateDocumentOpen, setIsCreateDocumentOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Processos Documentados
          </CardTitle>
          <CardDescription>
            Crie e gerencie documentos de processos da sua empresa como playbooks de vendas, 
            diretrizes e padronizações. Compartilhe com sua equipe através de links públicos.
          </CardDescription>
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

          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentos ({documents.length})
              </TabsTrigger>
              <TabsTrigger value="folders" className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                Pastas ({folders.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="space-y-4">
              <DocumentsList documents={documents} folders={folders} />
            </TabsContent>
            
            <TabsContent value="folders" className="space-y-4">
              <FoldersList folders={folders} />
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
      />
    </div>
  );
};

export default ProcessDocumentsManager;
