
import { supabase } from "@/integrations/supabase/client";
import { User, AdminModule } from "@/types/admin";
import { AdminUser } from "@/types/adminTypes";

// Direct Database Access Functions
export const fetchProfiles = async (): Promise<{ data: User[], error: any }> => {
  try {
    console.log("Fetching profiles directly from database...");
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      console.error("Error fetching profiles directly:", error);
      
      try {
        console.log("Attempting to fetch profiles using edge function...");
        const { data: edgeData, error: edgeError } = await supabase.functions.invoke('admin-helpers', {
          body: { action: 'listProfiles' }
        });
        
        if (edgeError) throw edgeError;
        return { data: edgeData || [], error: null };
      } catch (edgeCallError) {
        console.error("Edge function failed:", edgeCallError);
        throw edgeCallError;
      }
    }
    
    if (data) {
      // Format the profiles to match our User interface
      const formattedUsers = data.map(profile => ({
        id: profile.id,
        email: profile.email || '',
        isNewUser: profile.is_new_user || false,
        isAdmin: profile.is_admin || false,
        unlockedModules: [] // Will populate this next
      }));
      
      // Get unlocked modules for all users
      try {
        const userIds = formattedUsers.map(u => u.id);
        const { data: userModules, error: modulesError } = await supabase
          .from('user_modules')
          .select('*')
          .in('user_id', userIds);
          
        if (!modulesError && userModules) {
          // Populate unlockedModules for each user
          userModules.forEach(module => {
            const user = formattedUsers.find(u => u.id === module.user_id);
            if (user) {
              user.unlockedModules.push(module.module_id);
            }
          });
        }
      } catch (err) {
        console.error("Error fetching user modules:", err);
      }
      
      return { data: formattedUsers, error: null };
    }
    
    return { data: [], error: new Error("No data returned") };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return { data: [], error };
  }
};

// Fetch available modules
export const fetchModules = async (): Promise<{ data: AdminModule[], error: any }> => {
  try {
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
    
    return { data: formattedModules, error: null };
  } catch (error) {
    console.error("Error fetching modules:", error);
    return { data: [], error };
  }
};

// Direct table management - for full admin access
export const executeRawQuery = async (query: string, params?: any[]): Promise<{ data: any, error: any }> => {
  try {
    const { data, error } = await supabase.rpc('execute_sql', {
      query_text: query,
      query_params: params || []
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error executing raw query:", error);
    return { data: null, error };
  }
};

// Direct access to profiles table
export const fetchAllTables = async (): Promise<{ data: string[], error: any }> => {
  try {
    const { data, error } = await supabase.rpc('list_tables');
    
    if (error) throw error;
    return { data, error: null };
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
