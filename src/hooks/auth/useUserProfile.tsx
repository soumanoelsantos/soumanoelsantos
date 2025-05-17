
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/auth';

/**
 * Hook for user profile management
 */
export const useUserProfile = (
  userId: string | null, 
  setIsNewUser: (isNew: boolean) => void,
  setIsAdmin: (isAdmin: boolean) => void
) => {
  const { toast } = useToast();
  
  /**
   * Load user profile with better error handling
   */
  const loadUserProfile = async (id: string) => {
    try {
      console.log("Loading user profile for:", id);
      
      if (!id) {
        console.error("Cannot load profile: User ID is missing");
        return;
      }
      
      const profileData = await authService.fetchUserProfile(id);
      
      if (profileData) {
        console.log("Profile loaded:", profileData);
        setIsNewUser(profileData.is_new_user);
        setIsAdmin(profileData.is_admin);
      } else {
        console.log("No profile found for user:", id);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar perfil",
        description: "Não foi possível carregar seu perfil de usuário",
      });
      setIsAdmin(false);
    }
  };

  return { loadUserProfile };
};
