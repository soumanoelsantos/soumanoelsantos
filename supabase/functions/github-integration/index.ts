
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  private: boolean;
  default_branch: string;
}

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content?: string;
  encoding?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, data } = await req.json();
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Verificar autenticação do usuário
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    console.log(`🔧 GitHub Integration - Action: ${action}`);

    switch (action) {
      case 'authenticate': {
        const { token } = data;
        
        // Verificar se o token é válido
        const userResponse = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (!userResponse.ok) {
          throw new Error('Invalid GitHub token');
        }

        const githubUser = await userResponse.json();
        
        return new Response(
          JSON.stringify({
            success: true,
            user: {
              id: githubUser.id,
              login: githubUser.login,
              name: githubUser.name,
              avatar_url: githubUser.avatar_url
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'listRepositories': {
        const { token } = data;
        
        const reposResponse = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const repos: GitHubRepo[] = await reposResponse.json();
        
        return new Response(
          JSON.stringify({ success: true, repositories: repos }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'createRepository': {
        const { token, name, description, isPrivate } = data;
        
        const createResponse = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            description,
            private: isPrivate,
            auto_init: true
          })
        });

        if (!createResponse.ok) {
          const error = await createResponse.json();
          throw new Error(error.message || 'Failed to create repository');
        }

        const repo = await createResponse.json();
        
        return new Response(
          JSON.stringify({ success: true, repository: repo }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'pushCode': {
        const { token, owner, repo, branch, files, message } = data;
        
        // Obter SHA da branch atual
        const branchResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (!branchResponse.ok) {
          throw new Error('Failed to get branch information');
        }

        const branchData = await branchResponse.json();
        const baseSha = branchData.object.sha;

        // Criar tree com os arquivos
        const tree = files.map((file: any) => ({
          path: file.path,
          mode: '100644',
          type: 'blob',
          content: file.content
        }));

        const treeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
          method: 'POST',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            base_tree: baseSha,
            tree
          })
        });

        if (!treeResponse.ok) {
          throw new Error('Failed to create tree');
        }

        const treeData = await treeResponse.json();

        // Criar commit
        const commitResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
          method: 'POST',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message,
            tree: treeData.sha,
            parents: [baseSha]
          })
        });

        if (!commitResponse.ok) {
          throw new Error('Failed to create commit');
        }

        const commitData = await commitResponse.json();

        // Atualizar referência da branch
        const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sha: commitData.sha
          })
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update branch');
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            commit: {
              sha: commitData.sha,
              message: commitData.message,
              url: commitData.html_url
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'saveIntegration': {
        const { projectId, githubToken, githubUsername, repositoryName, repositoryUrl, branchName } = data;
        
        const { error } = await supabase
          .from('dev_github_integrations')
          .upsert({
            user_id: user.id,
            project_id: projectId,
            github_token: githubToken,
            github_username: githubUsername,
            repository_name: repositoryName,
            repository_url: repositoryUrl,
            branch_name: branchName || 'main'
          });

        if (error) {
          throw error;
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('❌ GitHub Integration Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
