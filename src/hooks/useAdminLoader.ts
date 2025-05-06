
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        
        try {
          // Attempt to fetch profiles using new method
          const profilesData = await fetchProfiles();
          setUsers(profilesData);
          console.log("Profiles loaded successfully:", profilesData.length);
        } catch (profileError) {
          console.error("Error fetching profiles:", profileError);
          
          // Fall back to empty array if profiles can't be loaded
          setUsers([]);
          toast({
            variant: "destructive",
            title: "Error loading users",
            description: "Using backup data. Try again later."
          });
        }
        
        try {
          // Attempt to fetch modules from the database
          const modulesData = await fetchModules();
          setModules(modulesData);
          console.log("Modules loaded successfully:", modulesData.length);
        } catch (modulesError) {
          console.error("Error fetching modules:", modulesError);
          
          // Fall back to default modules if they can't be loaded
          setModules(defaultModules);
        }
      } catch (error: any) {
        console.error("Error loading admin data:", error);
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: "Could not fetch user and module data."
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, navigate, toast, defaultModules]);

  return {
    users,
    setUsers,
    modules,
    isLoading
  };
};
