import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, AdminModule } from "@/types/admin";
import { fetchProfiles, fetchModules } from "@/services/adminService";

export const useAdminLoader = (isAuthenticated: boolean, defaultModules: AdminModule[]) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<AdminModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadAttempted, setLoadAttempted] = useState(false);

  const loadData = useCallback(async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      
      // Load profiles data
      try {
        const profilesResult = await fetchProfiles();
        
        if (profilesResult.error) throw profilesResult.error;
        
        setUsers(profilesResult.data || []);
        console.log("Users loaded successfully:", profilesResult.data?.length || 0);
      } catch (profileError) {
        console.error("Error loading users:", profileError);
        setUsers([]);
        toast({
          variant: "destructive",
          title: "Error loading users",
          description: "Could not load user data. Please try again."
        });
      }
      
      // Load modules data
      try {
        const modulesResult = await fetchModules();
        
        if (modulesResult.error) throw modulesResult.error;
        
        setModules(modulesResult.data || defaultModules);
        console.log("Modules loaded successfully:", modulesResult.data?.length || 0);
      } catch (modulesError) {
        console.error("Error loading modules:", modulesError);
        // Keep default modules as fallback
        setModules(defaultModules);
      }
    } catch (error: any) {
      console.error("Error loading admin data:", error);
    } finally {
      setIsLoading(false);
      setLoadAttempted(true);
    }
  }, [isAuthenticated, navigate, toast, defaultModules]);

  useEffect(() => {
    if (!loadAttempted) {
      loadData();
    }
  }, [loadAttempted, loadData]);

  return {
    users,
    setUsers,
    modules,
    isLoading: isLoading && !loadAttempted, // Consider not loading after first attempt
    refreshData: () => {
      setLoadAttempted(false); // This will trigger a reload
    }
  };
};
