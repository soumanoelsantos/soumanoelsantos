
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/admin";

export const fetchUserProfiles = async () => {
  console.log("Iniciando busca de perfis de usuários");
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*');

  if (profilesError) {
    console.error("Erro ao buscar perfis:", profilesError);
    throw profilesError;
  }

  console.log("Perfis encontrados:", profiles?.length || 0);
  return profiles;
};

export const fetchUserModules = async () => {
  const { data: userModules, error: modulesError } = await supabase
    .from('user_modules')
    .select('*');

  if (modulesError) {
    console.error("Erro ao buscar módulos de usuário:", modulesError);
    throw modulesError;
  }

  console.log("Módulos de usuário encontrados:", userModules?.length || 0);
  return userModules;
};

export const toggleModuleAccess = async (userId: string, moduleId: number, hasModule: boolean) => {
  if (hasModule) {
    // Remover acesso ao módulo
    const { error } = await supabase
      .from('user_modules')
      .delete()
      .eq('user_id', userId)
      .eq('module_id', moduleId);
      
    if (error) throw error;
  } else {
    // Adicionar acesso ao módulo
    const { error } = await supabase
      .from('user_modules')
      .insert([{ user_id: userId, module_id: moduleId }]);
      
    if (error) throw error;
  }
};

export const updateUserStatus = async (userId: string, isNewUser: boolean) => {
  const { error } = await supabase
    .from('profiles')
    .update({ is_new_user: isNewUser })
    .eq('id', userId);
    
  if (error) throw error;
};

export const deleteUserAccount = async (userId: string) => {
  const { error } = await supabase.functions.invoke('delete-user', {
    body: { user_id: userId }
  });
    
  if (error) throw error;
};

export const updateUserEmail = async (userId: string, newEmail: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({ email: newEmail })
    .eq('id', userId);
    
  if (error) throw error;
};
