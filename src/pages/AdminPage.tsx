
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminData } from "@/hooks/useAdminData";
import AdminHeader from "@/components/admin/AdminHeader";
import UsersManagement from "@/components/admin/UsersManagement";
import AdminInfoCard from "@/components/admin/AdminInfoCard";
import { transformUsersToAdminUsers } from "@/services/adminService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use localStorage to get user email if available
  const userEmail = localStorage.getItem("userEmail") || "admin@example.com";
  
  const { 
    users, 
    modules, 
    searchTerm, 
    setSearchTerm, 
    isLoading, 
    filteredUsers, 
    toggleModuleAccess, 
    toggleNewUserStatus,
    deleteUser,
    editUserEmail,
    viewAsUser,
    refreshData,
    toggleAllModules
  } = useAdminData(userEmail);

  const handleLogout = () => {
    navigate("/membros");
  };

  const handleRefresh = useCallback(() => {
    if (refreshData) {
      refreshData();
    } else {
      window.location.reload();
    }
  }, [refreshData]);

  // Removing the system toast notification that was here

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <AdminHeader userEmail={userEmail} onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <div className="text-gray-800 text-xl">Carregando administração...</div>
          <Button onClick={handleRefresh} variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            Recarregar
          </Button>
        </div>
      </div>
    );
  }

  // Transform users to match AdminUser type
  const adminUsers = users.length ? transformUsersToAdminUsers(users) : [];
  const filteredAdminUsers = filteredUsers.length ? transformUsersToAdminUsers(filteredUsers) : [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AdminHeader userEmail={userEmail} onLogout={handleLogout} />

      <div className="container mx-auto px-4 pb-8">
        <div className="mt-6 mb-6">
          <BackToMemberAreaButton />
        </div>

        <div className="mb-6">
          <Card className="bg-white border-dark-primary/20 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-gray-800">Painel de Administração</CardTitle>
              <CardDescription className="text-gray-600">
                Gerenciamento de usuários e acesso ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={handleRefresh} 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Atualizar dados
                </Button>
              </div>
              <UsersManagement 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredUsers={filteredAdminUsers}
                totalUsers={users.length}
                modules={modules}
                toggleNewUserStatus={toggleNewUserStatus}
                toggleModuleAccess={toggleModuleAccess}
                deleteUser={deleteUser}
                editUserEmail={editUserEmail}
                viewAsUser={viewAsUser}
                toggleAllModules={toggleAllModules}
              />
            </CardContent>
          </Card>
        </div>

        <AdminInfoCard />
      </div>
    </div>
  );
};

export default AdminPage;
