
import { supabase } from "@/integrations/supabase/client";
import { User, AdminModule } from "@/types/admin";
import { AdminUser } from "@/types/adminTypes";

// -------------------------------------------
// User Profile Management
// -------------------------------------------

// Fetch profiles with a reliable method
export const fetchProfiles = async (): Promise<User[]> => {
  try {
    // Try to get users directly from profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');
      
    if (profilesError) throw profilesError;
    
    // Get user modules
    const { data: userModules, error: modulesError } = await supabase
      .from('user_modules')
      .select('*');
      
    if (modulesError) throw modulesError;
    
    // Format profiles from direct query
    if (profiles) {
      return profiles.map((profile: any) => {
        const userModuleIds = userModules
          ? userModules
              .filter((module: any) => module.user_id === profile.id)
              .map((module: any) => module.module_id)
          : [];
              
        return {
          id: profile.id,
          email: profile.email,
          isNewUser: profile.is_new_user,
          isAdmin: profile.is_admin,
          unlockedModules: userModuleIds
        };
      });
    }
    
    // Fallback if no profiles are found
    return [];
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return []; // Return empty array on error instead of throwing
  }
};

// -------------------------------------------
// Module Management
// -------------------------------------------

// Fetch available modules
export const fetchModules = async (): Promise<AdminModule[]> => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*');
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching modules:", error);
    return []; // Return empty array on error
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
