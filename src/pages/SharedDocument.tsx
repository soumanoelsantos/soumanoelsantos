
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ProcessDocument } from '@/types/processDocuments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Loader2 } from 'lucide-react';

const SharedDocument = () => {
  const { token } = useParams();
  const [document, setDocument] = useState<ProcessDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!token) {
        setError('Token de acesso inválido');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('process_documents')
          .select('*')
          .eq('share_token', token)
          .eq('is_public', true)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            setError('Documento não encontrado ou não está público');
          } else {
            setError('Erro ao carregar documento');
          }
          return;
        }

        setDocument(data);
      } catch (err) {
        console.error('Erro ao buscar documento:', err);
        setError('Erro ao carregar documento');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocument();
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
          <span>Carregando documento...</span>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold mb-2">Documento não encontrado</h2>
            <p className="text-gray-600">
              {error || 'O documento que você está procurando não existe ou não está mais disponível.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-2xl">{document.title}</CardTitle>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Público
              </Badge>
            </div>
            
            {document.description && (
              <p className="text-gray-600">{document.description}</p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Publicado em {formatDate(document.created_at)}</span>
              </div>
              <Badge variant="secondary">{document.category}</Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="bg-white border rounded-lg p-6 min-h-[400px]">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {document.content || 'Nenhum conteúdo disponível.'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SharedDocument;
