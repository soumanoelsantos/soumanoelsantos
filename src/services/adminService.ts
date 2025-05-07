
import { supabase } from "@/integrations/supabase/client";
import { User, AdminModule } from "@/types/admin";
import { AdminUser } from "@/types/adminTypes";
import { LeadData } from "@/types/crm";

// Cache para respostas da edge function com TTL prolongado
const responseCache = {
  profiles: null as { data: User[], timestamp: number } | null,
  modules: null as { data: AdminModule[], timestamp: number } | null,
  cacheTTL: 120000 // 2 minutos de TTL para o cache (aumentado para reduzir chamadas à API)
};

// Direct Database Access Functions
export const fetchProfiles = async (): Promise<{ data: User[], error: any }> => {
  try {
    // Verificar cache primeiro
    if (responseCache.profiles && Date.now() - responseCache.profiles.timestamp < responseCache.cacheTTL) {
      console.log("Usando cache para perfis de usuários");
      return { data: responseCache.profiles.data, error: null };
    }

    console.log("Cache expirado ou não encontrado - buscando perfis via edge function");
    
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke('admin-helpers', {
      body: { action: 'listProfiles' }
    });
    
    if (edgeError) throw edgeError;
    
    // Atualizar cache
    if (edgeData) {
      responseCache.profiles = {
        data: edgeData,
        timestamp: Date.now()
      };
    }
    
    return { data: edgeData || [], error: null };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    
    // Em caso de erro, retornar o cache mesmo que expirado (se disponível)
    if (responseCache.profiles) {
      console.log("Usando cache expirado devido a erro na requisição");
      return { data: responseCache.profiles.data, error };
    }
    
    return { data: [], error };
  }
};

// Fetch available modules
export const fetchModules = async (): Promise<{ data: AdminModule[], error: any }> => {
  try {
    // Verificar cache primeiro
    if (responseCache.modules && Date.now() - responseCache.modules.timestamp < responseCache.cacheTTL) {
      console.log("Usando cache para módulos");
      return { data: responseCache.modules.data, error: null };
    }
    
    console.log("Cache expirado ou não encontrado - buscando módulos");
    
    const { data, error } = await supabase
      .from('modules')
      .select('*');
      
    if (error) throw error;
    
    // Garantir que os dados retornados estejam em conformidade com o tipo AdminModule
    const formattedModules = (data || []).map(module => ({
      id: module.id,
      title: module.title,
      description: module.description || undefined
    }));
    
    // Atualizar cache
    if (formattedModules) {
      responseCache.modules = {
        data: formattedModules,
        timestamp: Date.now()
      };
    }
    
    return { data: formattedModules, error: null };
  } catch (error) {
    console.error("Error fetching modules:", error);
    
    // Em caso de erro, retornar o cache mesmo que expirado (se disponível)
    if (responseCache.modules) {
      console.log("Usando cache expirado devido a erro na requisição");
      return { data: responseCache.modules.data, error };
    }
    
    return { data: [], error };
  }
};

// Direct table management - for full admin access
export const executeRawQuery = async (query: string, params?: any[]): Promise<{ data: any, error: any }> => {
  try {
    // Instead of using rpc with execute_sql, call the edge function
    const { data, error } = await supabase.functions.invoke('admin-helpers', {
      body: { action: 'executeQuery', query, params: params || [] }
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error executing raw query:", error);
    return { data: null, error };
  }
};

// Direct access to get list of tables
export const fetchAllTables = async (): Promise<{ data: string[], error: any }> => {
  try {
    // Use edge function to fetch tables instead of direct rpc
    const { data, error } = await supabase.functions.invoke('admin-helpers', {
      body: { action: 'listTables' }
    });
    
    if (error) throw error;
    
    // Ensure we return an array of strings
    return { data: Array.isArray(data) ? data : [], error: null };
  } catch (error) {
    console.error("Error fetching tables:", error);
    return { data: [], error };
  }
};

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

// Fetch leads from the database for CRM
export const fetchLeadsFromDb = async (): Promise<{ data: LeadData[], error: any }> => {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    return { data: data || [], error: null };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { data: [], error };
  }
};
