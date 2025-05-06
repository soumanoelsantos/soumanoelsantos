
import { supabase } from "@/integrations/supabase/client";
import { User, AdminModule } from "@/types/admin";
import { AdminUser } from "@/types/adminTypes";

// -------------------------------------------
// User Profile Management
// -------------------------------------------

// Fetch profiles with a reliable method
export const fetchProfiles = async () => {
  try {
    // Tentar buscar perfis através do método direto
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      console.error("Erro ao buscar perfis diretamente:", error);
      
      // Tentar com edge function como backup
      try {
        const { data: edgeData, error: edgeError } = await supabase.functions.invoke('admin-helpers', {
          body: { action: 'listProfiles' }
        });
        
        if (edgeError) throw edgeError;
        return { data: formatProfiles(edgeData || []), error: null };
      } catch (edgeCallError) {
        console.error("Edge function falhou:", edgeCallError);
        throw edgeCallError;
      }
    }
    
    // Se conseguimos buscar perfis diretamente, processar
    if (data) {
      return { data: formatProfiles(data), error: null };
    }
    
    return { data: [] as User[], error: new Error("Nenhum dado retornado") };
  } catch (error) {
    console.error("Erro ao buscar perfis:", error);
    return { data: [] as User[], error };
  }
};

// Helper para formatar dados de perfis
const formatProfiles = (profiles: any[]): User[] => {
  return profiles.map((profile) => ({
    id: profile.id,
    email: profile.email || '',
    isNewUser: profile.is_new_user || false,
    isAdmin: profile.is_admin || false,
    unlockedModules: profile.unlockedModules || [] 
  }));
};

// Buscar módulos de usuário e mesclar com os perfis
export const fetchUserModules = async (userIds: string[]) => {
  try {
    const { data, error } = await supabase
      .from('user_modules')
      .select('*')
      .in('user_id', userIds);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Erro ao buscar módulos de usuário:", error);
    return { data: [] as any[], error };
  }
};

// -------------------------------------------
// Module Management
// -------------------------------------------

// Fetch available modules
export const fetchModules = async () => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*');
      
    if (error) throw error;
    
    return { data: data as AdminModule[] || [], error: null };
  } catch (error) {
    console.error("Erro ao buscar módulos:", error);
    return { data: [] as AdminModule[], error };
  }
};

// -------------------------------------------
// Admin Data Transformation
// -------------------------------------------

// Transform User[] to AdminUser[] for compatibility
export const transformUsersToAdminUsers = (users: User[]): AdminUser[] => {
  return users.map(user => ({
    id: user.id,
    email: user.email,
    is_new_user: user.isNewUser,
    is_admin: user.isAdmin || false,
    unlockedModules: user.unlockedModules,
  }));
};
