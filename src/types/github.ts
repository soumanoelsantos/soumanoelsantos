
export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  private: boolean;
  default_branch: string;
  description?: string;
}

export interface GitHubIntegration {
  id: string;
  user_id: string;
  project_id: string;
  github_token: string;
  github_username: string;
  repository_name: string;
  repository_url: string;
  branch_name: string;
  auto_sync: boolean;
  last_sync_at?: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubSyncLog {
  id: string;
  integration_id: string;
  sync_type: 'push' | 'pull' | 'auto';
  status: 'success' | 'error' | 'pending';
  message?: string;
  files_changed: number;
  commit_hash?: string;
  created_at: string;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  url: string;
}
