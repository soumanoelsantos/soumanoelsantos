
export interface ProcessDocument {
  id: string;
  user_id: string;
  title: string;
  content: string;
  description?: string;
  category: string;
  folder_id?: string;
  is_public: boolean;
  share_token: string;
  file_path?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  created_at: string;
  updated_at: string;
}

export interface ProcessFolder {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_public: boolean;
  share_token: string;
  parent_folder_id?: string; // Nova propriedade para pastas aninhadas
  created_at: string;
  updated_at: string;
}

export interface CreateDocumentData {
  title: string;
  content?: string;
  description?: string;
  category?: string;
  folder_id?: string;
  is_public?: boolean;
  file_path?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
}

export interface CreateFolderData {
  name: string;
  description?: string;
  is_public?: boolean;
  parent_folder_id?: string; // Nova propriedade para pastas aninhadas
}
