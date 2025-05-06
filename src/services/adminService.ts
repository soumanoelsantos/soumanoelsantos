
import { supabase } from "@/integrations/supabase/client";
import { User, AdminModule } from "@/types/admin";

// Fetch profiles with a more reliable method
export const fetchProfiles = async (): Promise<User[]> => {
  try {
    // Try to get users directly from the auth API first
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (!authError && authData && authData.users.length > 0) {
      // If we have auth data, use it
      const { data: userModules, error: modulesError } = await supabase
        .from('user_modules')
        .select('*');
        
      if (modulesError) throw modulesError;
      
      return authData.users.map((user: any) => {
        const userModuleIds = userModules
          ? userModules
              .filter((module: any) => module.user_id === user.id)
              .map((module: any) => module.module_id)
          : [];
              
        return {
          id: user.id,
          email: user.email,
          isNewUser: user.user_metadata?.is_new_user || false,
          isAdmin: user.user_metadata?.is_admin || false,
          unlockedModules: userModuleIds
        };
      });
    }
    
    // Fallback to profiles table
    console.log("Fallback: buscando perfis da tabela profiles");
    const { data: profiles, error: profilesError } = await supabase
      .rpc('get_admin_profiles');
      
    if (profilesError) {
      // If RPC fails, try direct query with admin auth
      console.log("RPC falhou, tentando query direta");
      const { data: directProfiles, error: directError } = await supabase
        .from('profiles')
        .select('*');
        
      if (directError) throw directError;
      
      // Get user modules
      const { data: userModules, error: modulesError } = await supabase
        .from('user_modules')
        .select('*');
        
      if (modulesError) throw modulesError;
      
      // Format profiles from direct query
      return directProfiles.map((profile: any) => {
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
    
    // Format profiles from RPC
    if (profiles) {
      const { data: userModules, error: modulesError } = await supabase
        .from('user_modules')
        .select('*');
        
      if (modulesError) throw modulesError;
      
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
    
    throw new Error("Não foi possível obter os perfis de usuários");
  } catch (error) {
    console.error("Erro ao buscar perfis:", error);
    throw error;
  }
};

// Fetch available modules
export const fetchModules = async (): Promise<AdminModule[]> => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*');
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Erro ao buscar módulos:", error);
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
