
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ProcessFolder, ProcessDocument } from '@/types/processDocuments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Folder, FileText, Calendar, Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SharedFolder = () => {
  const { token } = useParams();
  const [folder, setFolder] = useState<ProcessFolder | null>(null);
  const [documents, setDocuments] = useState<ProcessDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<ProcessDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolderAndDocuments = async () => {
      if (!token) {
        setError('Token de acesso inválido');
        setIsLoading(false);
        return;
      }

      try {
        // Buscar pasta
        const { data: folderData, error: folderError } = await supabase
          .from('process_folders')
          .select('*')
          .eq('share_token', token)
          .eq('is_public', true)
          .single();

        if (folderError) {
          if (folderError.code === 'PGRST116') {
            setError('Pasta não encontrada ou não está pública');
          } else {
            setError('Erro ao carregar pasta');
          }
          return;
        }

        setFolder(folderData);

        // Buscar documentos da pasta que são públicos
        const { data: documentsData, error: documentsError } = await supabase
          .from('process_documents')
          .select('*')
          .eq('folder_id', folderData.id)
          .eq('is_public', true)
          .order('created_at', { ascending: false });

        if (documentsError) {
          console.error('Erro ao buscar documentos:', documentsError);
        } else {
          setDocuments(documentsData || []);
        }
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Erro ao carregar pasta');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFolderAndDocuments();
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando pasta...</span>
        </div>
      </div>
    );
  }

  if (error || !folder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <Folder className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold mb-2">Pasta não encontrada</h2>
            <p className="text-gray-600">
              {error || 'A pasta que você está procurando não existe ou não está mais disponível.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedDocument) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedDocument(null)}
              className="mb-4"
            >
              ← Voltar para {folder.name}
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl">{selectedDocument.title}</CardTitle>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Público
                </Badge>
              </div>
              
              {selectedDocument.description && (
                <p className="text-gray-600">{selectedDocument.description}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Publicado em {formatDate(selectedDocument.created_at)}</span>
                </div>
                <Badge variant="secondary">{selectedDocument.category}</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="bg-white border rounded-lg p-6 min-h-[400px]">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {selectedDocument.content || 'Nenhum conteúdo disponível.'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Folder className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-2xl">{folder.name}</CardTitle>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Público
              </Badge>
            </div>
            
            {folder.description && (
              <p className="text-gray-600">{folder.description}</p>
            )}
            
            <div className="flex items-center gap-1 text-sm text-gray-500 pt-2">
              <Calendar className="h-4 w-4" />
              <span>Criada em {formatDate(folder.created_at)}</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <h3 className="font-medium text-lg">
                Documentos ({documents.length})
              </h3>
              
              {documents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum documento público encontrado nesta pasta</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <h4 className="font-medium">{document.title}</h4>
                          </div>
                          
                          {document.description && (
                            <p className="text-sm text-gray-600 mb-2">{document.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Criado em {formatDate(document.created_at)}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {document.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDocument(document)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver documento
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SharedFolder;
