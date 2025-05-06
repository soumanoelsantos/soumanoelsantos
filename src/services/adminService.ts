
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
// User Module Access Management
// -------------------------------------------

// Toggle user module access
export const toggleUserModuleAccess = async (userId: string, moduleId: number) => {
  // Check if user already has access to the module
  const { data: existingModules, error: checkError } = await supabase
    .from('user_modules')
    .select('*')
    .eq('user_id', userId)
    .eq('module_id', moduleId);
    
  if (checkError) throw checkError;
  
  if (existingModules && existingModules.length > 0) {
    // User has access, remove it
    const { error } = await supabase
      .from('user_modules')
      .delete()
      .eq('user_id', userId)
      .eq('module_id', moduleId);
      
    if (error) throw error;
    
    return { success: true, added: false };
  } else {
    // User doesn't have access, add it
    const { error } = await supabase
      .from('user_modules')
      .insert([{ user_id: userId, module_id: moduleId }]);
      
    if (error) throw error;
    
    return { success: true, added: true };
  }
};

// -------------------------------------------
// User Status Management
// -------------------------------------------

// Update user new status
export const updateUserNewStatus = async (userId: string, newStatus: boolean) => {
  const { error } = await supabase
    .from('profiles')
    .update({ is_new_user: newStatus })
    .eq('id', userId);
    
  if (error) throw error;
  
  return { success: true, newStatus };
};

// -------------------------------------------
// User Account Management
// -------------------------------------------

// Delete user
export const deleteUserById = async (userId: string) => {
  const { error } = await supabase.functions.invoke('delete-user', {
    body: { user_id: userId }
  });
    
  if (error) throw error;
  
  return { success: true };
};

// Update user email
export const updateUserEmail = async (userId: string, newEmail: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({ email: newEmail })
    .eq('id', userId);
    
  if (error) throw error;
  
  return { success: true, newEmail };
};

// -------------------------------------------
// User Impersonation
// -------------------------------------------

// Impersonate user (view as user)
export const impersonateUser = async (userId: string, adminEmail: string | null | undefined) => {
  // Store admin info for later restoration
  localStorage.setItem('adminViewingAsUser', 'true');
  localStorage.setItem('adminOriginalEmail', adminEmail || '');
  
  // Clear current session to force login as the selected user
  const { error } = await supabase.auth.setSession({
    access_token: '', 
    refresh_token: ''
  });
  
  if (error) throw error;
  
  return { success: true };
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
