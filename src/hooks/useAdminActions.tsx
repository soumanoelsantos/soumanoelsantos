
import { useToast } from "@/hooks/use-toast";
import { User, AdminModule } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const useAdminActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  modules: AdminModule[],
  currentUserEmail?: string | null
) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleModuleAccess = async (userId: string, moduleId: number) => {
    try {
      const hasModule = users.find(u => u.id === userId)?.unlockedModules.includes(moduleId);
      
      if (hasModule) {
        // Remove module access
        const { error } = await supabase
          .from('user_modules')
          .delete()
          .eq('user_id', userId)
          .eq('module_id', moduleId);
          
        if (error) throw error;
      } else {
        // Add module access
        const { error } = await supabase
          .from('user_modules')
          .insert([{ user_id: userId, module_id: moduleId }]);
          
        if (error) throw error;
      }
      
      // Update local state
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === userId) {
            const updatedModules = hasModule
              ? user.unlockedModules.filter(id => id !== moduleId)
              : [...user.unlockedModules, moduleId];
              
            toast({
              title: `Module ${hasModule ? "blocked" : "unblocked"}`,
              description: `${modules.find(m => m.id === moduleId)?.title} ${hasModule ? "blocked" : "unblocked"} for ${user.email}`,
            });
            
            return { ...user, unlockedModules: updatedModules };
          }
          return user;
        });
      });
      
      return true;
    } catch (error: any) {
      console.error("Error toggling module access:", error);
      toast({
        variant: "destructive",
        title: "Error modifying access",
        description: error.message || "Could not modify module access."
      });
      return false;
    }
  };

  const toggleNewUserStatus = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return false;
      
      const updatedStatus = !user.isNewUser;
      
      const { error } = await supabase
        .from('profiles')
        .update({ is_new_user: updatedStatus })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(prevUsers => {
        return prevUsers.map(u => {
          if (u.id === userId) {
            toast({
              title: "Status updated",
              description: `${u.email} is now ${updatedStatus ? "" : "no longer "}a new user`,
            });
            
            return { ...u, isNewUser: updatedStatus };
          }
          return u;
        });
      });
      
      return true;
    } catch (error: any) {
      console.error("Error toggling new user status:", error);
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: error.message || "Could not update user status."
      });
      return false;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Get user email before deleting
      const userToDelete = users.find(u => u.id === userId);
      if (!userToDelete) return false;
      
      // Call edge function to delete user
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { user_id: userId }
      });
        
      if (error) throw error;
      
      // Update local state
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.filter(user => user.id !== userId);
        
        toast({
          title: "User deleted",
          description: `${userToDelete.email} was successfully removed`,
        });
        
        return updatedUsers;
      });
      
      return true;
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        title: "Error deleting user",
        description: error.message || "Could not delete user."
      });
      return false;
    }
  };

  const editUserEmail = async (userId: string, newEmail: string) => {
    try {
      const userToEdit = users.find(u => u.id === userId);
      if (!userToEdit) return false;
      
      const { error } = await supabase
        .from('profiles')
        .update({ email: newEmail })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.map(user => {
          if (user.id === userId) {
            toast({
              title: "Email updated",
              description: `${user.email} was changed to ${newEmail}`,
            });
            
            return { ...user, email: newEmail };
          }
          return user;
        });
        
        return updatedUsers;
      });
      
      return true;
    } catch (error: any) {
      console.error("Error editing user email:", error);
      toast({
        variant: "destructive",
        title: "Error updating email",
        description: error.message || "Could not update user email."
      });
      return false;
    }
  };

  const viewAsUser = async (userId: string) => {
    try {
      const userToView = users.find(u => u.id === userId);
      if (!userToView) return false;
      
      // Store admin info for later restoration
      localStorage.setItem('adminViewingAsUser', 'true');
      localStorage.setItem('adminOriginalEmail', currentUserEmail || '');
      
      // Clear current session to force login as selected user
      const { error } = await supabase.auth.setSession({
        access_token: '', // Empty token to force login as another user
        refresh_token: ''
      });
      
      if (error) throw error;
      
      toast({
        title: "Viewing as user",
        description: `Now viewing as ${userToView.email}`,
      });
      
      // Navigate to members area
      navigate('/membros');
      return true;
    } catch (error: any) {
      console.error("Error viewing as user:", error);
      toast({
        variant: "destructive",
        title: "Error switching user",
        description: error.message || "Could not view as selected user."
      });
      return false;
    }
  };

  return {
    toggleModuleAccess,
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser
  };
};
