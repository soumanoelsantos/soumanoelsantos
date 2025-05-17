
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminData } from "@/hooks/useAdminData";
import AdminHeader from "@/components/admin/AdminHeader";
import UsersManagement from "@/components/admin/UsersManagement";
import AdminInfoCard from "@/components/admin/AdminInfoCard";
import { transformUsersToAdminUsers } from "@/services/adminService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatabaseAdmin from "@/components/admin/DatabaseAdmin";
import { Button } from "@/components/ui/button";
import { RefreshCcw, ArrowLeft } from "lucide-react";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";

const AdminPage = () => {
  const navigate = useNavigate();
  const { userEmail, userId } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Remover verificação de admin e carregar página imediatamente
  useEffect(() => {
    console.log("Admin page - acesso direto concedido");
    setIsPageLoaded(true);
  }, []);
  
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

  // Mostrar apenas tela de carregamento enquanto os dados são carregados
  if (!isPageLoaded || isLoading) {
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
              <CardTitle className="text-2xl text-gray-800">Painel de Administração Completo</CardTitle>
              <CardDescription className="text-gray-600">
                Acesso total ao banco de dados e gerenciamento de usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="users">Gerenciar Usuários</TabsTrigger>
                  <TabsTrigger value="database">Banco de Dados</TabsTrigger>
                </TabsList>
                
                <TabsContent value="users" className="pt-2">
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
                </TabsContent>
                
                <TabsContent value="database" className="pt-2">
                  <DatabaseAdmin />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {activeTab === "users" && <AdminInfoCard />}
      </div>
    </div>
  );
};

export default AdminPage;
