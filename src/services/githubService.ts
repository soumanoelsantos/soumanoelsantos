
import { supabase } from "@/integrations/supabase/client";

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
}

export interface GitHubIntegration {
  id: string;
  project_id: string;
  github_token: string;
  github_username: string;
  repository_name: string;
  repository_url: string;
  branch_name: string;
  auto_sync: boolean;
  last_sync_at?: string;
}

export class GitHubService {
  static async authenticateWithToken(token: string): Promise<GitHubUser> {
    const { data, error } = await supabase.functions.invoke('github-integration', {
      body: {
        action: 'authenticate',
        data: { token }
      }
    });

    if (error || !data.success) {
      throw new Error(data?.error || 'Failed to authenticate with GitHub');
    }

    return data.user;
  }

  static async listRepositories(token: string): Promise<GitHubRepository[]> {
    const { data, error } = await supabase.functions.invoke('github-integration', {
      body: {
        action: 'listRepositories',
        data: { token }
      }
    });

    if (error || !data.success) {
      throw new Error(data?.error || 'Failed to list repositories');
    }

    return data.repositories;
  }

  static async createRepository(
    token: string, 
    name: string, 
    description?: string, 
    isPrivate: boolean = true
  ): Promise<GitHubRepository> {
    const { data, error } = await supabase.functions.invoke('github-integration', {
      body: {
        action: 'createRepository',
        data: { token, name, description, isPrivate }
      }
    });

    if (error || !data.success) {
      throw new Error(data?.error || 'Failed to create repository');
    }

    return data.repository;
  }

  static async pushCode(
    token: string,
    owner: string,
    repo: string,
    branch: string,
    files: { path: string; content: string }[],
    message: string
  ): Promise<{ sha: string; message: string; url: string }> {
    const { data, error } = await supabase.functions.invoke('github-integration', {
      body: {
        action: 'pushCode',
        data: { token, owner, repo, branch, files, message }
      }
    });

    if (error || !data.success) {
      throw new Error(data?.error || 'Failed to push code');
    }

    return data.commit;
  }

  static async saveIntegration(integration: Omit<GitHubIntegration, 'id'>): Promise<void> {
    const { data, error } = await supabase.functions.invoke('github-integration', {
      body: {
        action: 'saveIntegration',
        data: integration
      }
    });

    if (error || !data.success) {
      throw new Error(data?.error || 'Failed to save integration');
    }
  }

  static async getProjectIntegration(projectId: string): Promise<GitHubIntegration | null> {
    const { data, error } = await supabase
      .from('dev_github_integrations')
      .select('*')
      .eq('project_id', projectId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching GitHub integration:', error);
      return null;
    }

    return data;
  }

  static async deleteIntegration(projectId: string): Promise<void> {
    const { error } = await supabase
      .from('dev_github_integrations')
      .delete()
      .eq('project_id', projectId);

    if (error) {
      throw new Error('Failed to delete GitHub integration');
    }
  }
}
