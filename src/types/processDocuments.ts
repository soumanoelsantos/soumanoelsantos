
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
}

export interface CreateFolderData {
  name: string;
  description?: string;
  is_public?: boolean;
}
