
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ProcessDocument, ProcessFolder, CreateDocumentData, CreateFolderData } from '@/types/processDocuments';
import { toast } from 'sonner';

export const useProcessDocuments = () => {
  const [documents, setDocuments] = useState<ProcessDocument[]>([]);
  const [folders, setFolders] = useState<ProcessFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();

  const fetchDocuments = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('process_documents')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      toast.error('Erro ao carregar documentos');
    }
  };

  const fetchFolders = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('process_folders')
        .select('*')
        .eq('user_id', userId)
        .order('name');

      if (error) throw error;
      setFolders(data || []);
    } catch (error) {
      console.error('Erro ao buscar pastas:', error);
      toast.error('Erro ao carregar pastas');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchDocuments(), fetchFolders()]);
      setIsLoading(false);
    };

    loadData();
  }, [userId]);

  const createDocument = async (data: CreateDocumentData) => {
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const { data: newDocument, error } = await supabase
        .from('process_documents')
        .insert({
          ...data,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;

      setDocuments(prev => [newDocument, ...prev]);
      toast.success('Documento criado com sucesso!');
      return newDocument;
    } catch (error) {
      console.error('Erro ao criar documento:', error);
      toast.error('Erro ao criar documento');
      throw error;
    }
  };

  const updateDocument = async (id: string, data: Partial<CreateDocumentData>) => {
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const { data: updatedDocument, error } = await supabase
        .from('process_documents')
        .update(data)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      setDocuments(prev => prev.map(doc => doc.id === id ? updatedDocument : doc));
      toast.success('Documento atualizado com sucesso!');
      return updatedDocument;
    } catch (error) {
      console.error('Erro ao atualizar documento:', error);
      toast.error('Erro ao atualizar documento');
      throw error;
    }
  };

  const deleteDocument = async (id: string) => {
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      // Get document to check if it has a file
      const { data: document } = await supabase
        .from('process_documents')
        .select('file_path')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      // Delete file from storage if it exists
      if (document?.file_path) {
        await supabase.storage
          .from('process-files')
          .remove([document.file_path]);
      }

      // Delete document record
      const { error } = await supabase
        .from('process_documents')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      setDocuments(prev => prev.filter(doc => doc.id !== id));
      toast.success('Documento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
      toast.error('Erro ao excluir documento');
      throw error;
    }
  };

  const createFolder = async (data: CreateFolderData) => {
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const { data: newFolder, error } = await supabase
        .from('process_folders')
        .insert({
          ...data,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;

      setFolders(prev => [...prev, newFolder]);
      toast.success('Pasta criada com sucesso!');
      return newFolder;
    } catch (error) {
      console.error('Erro ao criar pasta:', error);
      toast.error('Erro ao criar pasta');
      throw error;
    }
  };

  const updateFolder = async (id: string, data: Partial<CreateFolderData>) => {
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const { data: updatedFolder, error } = await supabase
        .from('process_folders')
        .update(data)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      setFolders(prev => prev.map(folder => folder.id === id ? updatedFolder : folder));
      toast.success('Pasta atualizada com sucesso!');
      return updatedFolder;
    } catch (error) {
      console.error('Erro ao atualizar pasta:', error);
      toast.error('Erro ao atualizar pasta');
      throw error;
    }
  };

  const deleteFolder = async (id: string) => {
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const { error } = await supabase
        .from('process_folders')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      setFolders(prev => prev.filter(folder => folder.id !== id));
      toast.success('Pasta excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir pasta:', error);
      toast.error('Erro ao excluir pasta');
      throw error;
    }
  };

  const toggleDocumentPublic = async (id: string, isPublic: boolean) => {
    return updateDocument(id, { is_public: isPublic });
  };

  const toggleFolderPublic = async (id: string, isPublic: boolean) => {
    return updateFolder(id, { is_public: isPublic });
  };

  // Helper function to get root folders (folders without parent)
  const getRootFolders = () => {
    return folders.filter(folder => !folder.parent_folder_id);
  };

  // Helper function to get subfolders of a specific folder
  const getSubfolders = (parentId: string) => {
    return folders.filter(folder => folder.parent_folder_id === parentId);
  };

  return {
    documents,
    folders,
    isLoading,
    createDocument,
    updateDocument,
    deleteDocument,
    createFolder,
    updateFolder,
    deleteFolder,
    toggleDocumentPublic,
    toggleFolderPublic,
    getRootFolders,
    getSubfolders,
    refetch: () => Promise.all([fetchDocuments(), fetchFolders()]),
  };
};
