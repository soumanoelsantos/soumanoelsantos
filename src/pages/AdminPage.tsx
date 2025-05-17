
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
import { RefreshCcw, ArrowLeft, AlertTriangle } from "lucide-react";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminPage = () => {
  const navigate = useNavigate();
  const { userEmail, isAdmin, userId } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("users");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [adminCheckAttempts, setAdminCheckAttempts] = useState(0);
  const [adminCheckError, setAdminCheckError] = useState<string | null>(null);
  
  // Enhanced admin check with better error handling
  useEffect(() => {
    console.log("Admin page - checking admin status:", { isAdmin, userEmail, userId });
    
    // Only allow a reasonable number of admin check attempts
    if (adminCheckAttempts > 5) {
      console.log("Exceeded maximum admin check attempts");
      setAdminCheckError("Não foi possível verificar seu status de administrador após várias tentativas.");
      setTimeout(() => {
        navigate("/membros");
        toast({
          title: "Acesso negado",
          description: "Você não tem permissões de administrador ou ocorreu um erro de verificação.",
          variant: "destructive"
        });
      }, 2000);
      return;
    }
    
    if (!userId) {
      if (adminCheckAttempts > 2) {
        setAdminCheckError("Você precisa estar logado para acessar esta página.");
        setTimeout(() => {
          navigate("/login", { state: { from: "/admin" } });
          toast({
            title: "Autenticação necessária",
            description: "Faça login para acessar a área de administração.",
            variant: "destructive"
          });
        }, 2000);
      }
      return;
    }
    
    const checkAdmin = () => {
      setIsPageLoaded(true);
      setAdminCheckAttempts(prev => prev + 1);
      
      // If admin status is definitively false, redirect
      if (isAdmin === false) {
        console.log("User is NOT admin, redirecting to members area");
        setAdminCheckError("Você não tem permissões de administrador.");
        setTimeout(() => {
          navigate("/membros");
          toast({
            title: "Acesso negado",
            description: "Você não tem permissões de administrador.",
            variant: "destructive"
          });
        }, 1500);
      } 
      // If admin status is true, allow access
      else if (isAdmin === true) {
        console.log("User confirmed as admin, granting access");
        setAdminCheckError(null);
      }
      // If admin status is still undetermined, try again after a delay
      else {
        console.log(`Admin status undetermined (attempt ${adminCheckAttempts + 1}), checking again...`);
        // Retry with backoff
        const delay = Math.min(800 * (adminCheckAttempts + 1), 2500);
        setTimeout(checkAdmin, delay);
      }
    };
    
    if (userId) {
      checkAdmin();
    }
    
  }, [isAdmin, navigate, adminCheckAttempts, userId, toast, userEmail]);
  
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
      setAdminCheckError(null);
    } else {
      // Fallback para quando refreshData não estiver disponível
      window.location.reload();
    }
  }, [refreshData]);

  // If still checking admin status or loading data, show loading screen
  if (!isPageLoaded || isLoading || (isAdmin !== true && !adminCheckError)) {
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

  // Display error message if there's an admin check error
  if (adminCheckError) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <AdminHeader userEmail={userEmail} onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro de acesso</AlertTitle>
            <AlertDescription>
              {adminCheckError}
            </AlertDescription>
          </Alert>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button onClick={handleRefresh} variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Tentar novamente
            </Button>
            
            <Button onClick={() => navigate("/membros")} variant="default" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Área de Membros
            </Button>
          </div>
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
