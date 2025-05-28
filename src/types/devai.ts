
export interface DevProject {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface DevConversation {
  id: string;
  project_id: string;
  messages: DevMessage[];
  created_at: string;
  updated_at: string;
}

export interface DevMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: { file: File; preview: string };
}

export interface CreateProjectData {
  name: string;
  description?: string;
}
