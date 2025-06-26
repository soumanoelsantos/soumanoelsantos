
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

/**
 * Fetches user profile data from Supabase
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    console.log("Fetching user profile for:", userId);
    
    // Primeiro, tentar buscar o perfil existente
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error("Error fetching profile:", fetchError);
      throw fetchError;
    }

    // Se o perfil existe, retornar
    if (existingProfile) {
      console.log("Profile found:", existingProfile);
      return existingProfile as UserProfile;
    }

    // Se não existe perfil, criar um novo
    console.log("No profile found, creating new profile for user:", userId);
    
    // Buscar dados do usuário autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("Error getting authenticated user:", userError);
      throw userError;
    }

    // Criar novo perfil
    const newProfile = {
      id: userId,
      email: user.email || '',
      is_new_user: true,
      is_admin: false
    };

    const { data: createdProfile, error: createError } = await supabase
      .from('profiles')
      .insert(newProfile)
      .select()
      .single();

    if (createError) {
      console.error("Error creating profile:", createError);
      throw createError;
    }

    console.log("Profile created successfully:", createdProfile);
    return createdProfile as UserProfile;
    
  } catch (error) {
    console.error('Erro ao buscar/criar perfil do usuário:', error);
    return null;
  }
};
