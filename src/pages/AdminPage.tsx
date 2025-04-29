
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useAdminData } from "@/hooks/useAdminData";
import AdminHeader from "@/components/admin/AdminHeader";
import UsersManagement from "@/components/admin/UsersManagement";
import AdminInfoCard from "@/components/admin/AdminInfoCard";

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, userEmail, isAdmin } = useAuth();
  const { 
    users, 
    modules, 
    searchTerm, 
    setSearchTerm, 
    isLoading, 
    filteredUsers, 
    toggleModuleAccess, 
    toggleNewUserStatus 
  } = useAdminData(userEmail);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      // Redirect to login with the current path as the redirect target
      navigate("/login?from=/admin");
      return;
    }

    // Check if user is admin
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Acesso restrito",
        description: "Esta página é apenas para administradores",
      });
      navigate("/membros");
      return;
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);

  const handleLogout = () => {
    navigate("/membros");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <div className="text-dark-text">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background flex flex-col">
      <AdminHeader userEmail={userEmail} onLogout={handleLogout} />

      <div className="container mx-auto px-4 pb-8">
        <UsersManagement 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredUsers={filteredUsers}
          totalUsers={users.length}
          modules={modules}
          toggleNewUserStatus={toggleNewUserStatus}
          toggleModuleAccess={toggleModuleAccess}
        />

        <AdminInfoCard />
      </div>
    </div>
  );
};

export default AdminPage;
