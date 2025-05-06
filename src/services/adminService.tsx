
import { supabase } from "@/integrations/supabase/client";
import { AdminModule, User } from "@/types/admin";
import { AdminUser } from "@/types/adminTypes";

// Fetch admin data (users and modules)
export const fetchAdminData = async () => {
  console.log("Fetching admin data");
  
  try {
    // Fetch profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');

    if (profilesError) throw profilesError;
    
    // Fetch user modules
    const { data: userModules, error: modulesError } = await supabase
      .from('user_modules')
      .select('*');

    if (modulesError) throw modulesError;
    
    // Fetch available modules
    const { data: modulesData, error: moduleListError } = await supabase
      .from('modules')
      .select('*');

    if (moduleListError) throw moduleListError;
    
    // Process users data
    const users: AdminUser[] = profiles.map((profile: any) => {
      const userModulesList = userModules
        .filter((module: any) => module.user_id === profile.id)
        .map((module: any) => ({
          id: module.module_id,
          title: modulesData.find((m: any) => m.id === module.module_id)?.title || `Módulo ${module.module_id}`,
          description: modulesData.find((m: any) => m.id === module.module_id)?.description || ""
        }));

      return {
        id: profile.id,
        email: profile.email,
        is_new_user: profile.is_new_user,
        is_admin: profile.is_admin,
        modules: userModulesList
      };
    });
    
    return { 
      users, 
      modules: modulesData || []
    };
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

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

// Update user new status
export const updateUserNewStatus = async (userId: string, newStatus: boolean) => {
  const { error } = await supabase
    .from('profiles')
    .update({ is_new_user: newStatus })
    .eq('id', userId);
    
  if (error) throw error;
  
  return { success: true, newStatus };
};

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
