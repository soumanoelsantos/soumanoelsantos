
import { supabase } from "@/integrations/supabase/client";
import { AdminUser } from "@/types/adminTypes";
import { toast } from "@/hooks/use-toast";

export const fetchAdminData = async () => {
  try {
    // Fetch all profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');

    if (profilesError) throw profilesError;

    // Fetch all modules
    const { data: allModules, error: modulesError } = await supabase
      .from('modules')
      .select('*');

    if (modulesError) throw modulesError;
    
    // Fetch all module assignments
    const { data: userModules, error: userModulesError } = await supabase
      .from('user_modules')
      .select('user_id, module_id');

    if (userModulesError) throw userModulesError;

    // Create a map of user IDs to their assigned modules
    const userModulesMap = new Map<string, number[]>();
    userModules?.forEach((um) => {
      if (!userModulesMap.has(um.user_id)) {
        userModulesMap.set(um.user_id, []);
      }
      userModulesMap.get(um.user_id)?.push(um.module_id);
    });

    // Build the users array with their modules
    const usersWithModules = profiles?.map((profile) => ({
      id: profile.id,
      email: profile.email,
      is_new_user: profile.is_new_user,
      is_admin: profile.is_admin,
      modules: (userModulesMap.get(profile.id) || [])
        .map(moduleId => allModules?.find(m => m.id === moduleId))
        .filter(m => m !== undefined) as any[]
    })) || [];

    return {
      users: usersWithModules,
      modules: allModules || []
    };
  } catch (error) {
    console.error("Error loading admin data:", error);
    throw error;
  }
};

export const toggleUserModuleAccess = async (userId: string, moduleId: number) => {
  try {
    // Check if the module access already exists
    const { data: existingAccess, error: checkError } = await supabase
      .from('user_modules')
      .select('id')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existingAccess) {
      // Remove access
      const { error: deleteError } = await supabase
        .from('user_modules')
        .delete()
        .eq('id', existingAccess.id);

      if (deleteError) throw deleteError;
      return { added: false, moduleId };
    } else {
      // Add access
      const { error: insertError } = await supabase
        .from('user_modules')
        .insert({ user_id: userId, module_id: moduleId });

      if (insertError) throw insertError;
      return { added: true, moduleId };
    }
  } catch (error) {
    console.error("Error toggling module access:", error);
    throw error;
  }
};

export const updateUserNewStatus = async (userId: string, isNewUser: boolean) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ is_new_user: isNewUser })
      .eq('id', userId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    const response = await supabase.functions.invoke("delete-user", {
      body: { userId }
    });

    if (response.error) {
      throw new Error(response.error.message || 'Error deleting user');
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUserEmail = async (userId: string, newEmail: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ email: newEmail })
      .eq('id', userId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error updating user email:", error);
    throw error;
  }
};

export const impersonateUser = async (userId: string, adminEmail: string | null) => {
  try {
    // Store admin info in localStorage for later restoration
    localStorage.setItem('adminViewingAsUser', 'true');
    localStorage.setItem('adminOriginalEmail', adminEmail || '');
    
    // Clear current session
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error impersonating user:", error);
    throw error;
  }
};

// Add compatibility with the old function names for backward compatibility
export const toggleModuleAccess = toggleUserModuleAccess;
export const updateUserStatus = updateUserNewStatus;
