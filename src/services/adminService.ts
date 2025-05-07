
import { supabase } from "@/integrations/supabase/client";
import { User, AdminModule } from "@/types/admin";
import { AdminUser } from "@/types/adminTypes";
import { LeadData } from "@/types/crm";

// Cache for edge function responses
const responseCache = {
  profiles: null as { data: User[], timestamp: number } | null,
  modules: null as { data: AdminModule[], timestamp: number } | null,
  cacheTTL: 60000 // 60 seconds cache TTL
};

// Direct Database Access Functions
export const fetchProfiles = async (): Promise<{ data: User[], error: any }> => {
  try {
    // Check cache first
    if (responseCache.profiles && Date.now() - responseCache.profiles.timestamp < responseCache.cacheTTL) {
      return { data: responseCache.profiles.data, error: null };
    }

    console.log("Cache miss or expired - fetching profiles from edge function");
    
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke('admin-helpers', {
      body: { action: 'listProfiles' }
    });
    
    if (edgeError) throw edgeError;
    
    // Update cache
    if (edgeData) {
      responseCache.profiles = {
        data: edgeData,
        timestamp: Date.now()
      };
    }
    
    return { data: edgeData || [], error: null };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return { data: [], error };
  }
};

// Fetch available modules
export const fetchModules = async (): Promise<{ data: AdminModule[], error: any }> => {
  try {
    // Check cache first
    if (responseCache.modules && Date.now() - responseCache.modules.timestamp < responseCache.cacheTTL) {
      return { data: responseCache.modules.data, error: null };
    }
    
    const { data, error } = await supabase
      .from('modules')
      .select('*');
      
    if (error) throw error;
    
    // Ensure returned data conforms to AdminModule type
    const formattedModules = (data || []).map(module => ({
      id: module.id,
      title: module.title,
      description: module.description || undefined
    }));
    
    // Update cache
    if (formattedModules) {
      responseCache.modules = {
        data: formattedModules,
        timestamp: Date.now()
      };
    }
    
    return { data: formattedModules, error: null };
  } catch (error) {
    console.error("Error fetching modules:", error);
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
