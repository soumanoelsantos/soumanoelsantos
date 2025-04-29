import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Switch } from "@/components/ui/switch";
import MemberHeader from "@/components/MemberHeader";
import { Search, UserIcon } from "lucide-react";

interface User {
  email: string;
  isNewUser: boolean;
  unlockedModules: number[];
}

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, userEmail, isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock modules for reference
  const modules = [
    { id: 0, title: "Ferramentas" },
    { id: 1, title: "Módulo 1 - Diagnóstico e Estratégia" },
    { id: 2, title: "Módulo 2 - Sistema de Vendas" },
    { id: 3, title: "Módulo 3 - Marketing Digital" },
    { id: 4, title: "Módulo 4 - Gestão e Escalabilidade" }
  ];

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

    // Load mock users data
    // In a real app, this would come from an API or database
    const mockUsers = [
      {
        email: "usuario1@example.com",
        isNewUser: true,
        unlockedModules: [0]
      },
      {
        email: "usuario2@example.com",
        isNewUser: false,
        unlockedModules: [0, 1, 2]
      },
      {
        email: userEmail || "admin@example.com",
        isNewUser: false,
        unlockedModules: [0, 1, 2, 3, 4]
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 500);
  }, [isAuthenticated, isAdmin, navigate, toast, userEmail]);

  const handleLogout = () => {
    navigate("/membros");
  };

  const toggleModuleAccess = (userEmail: string, moduleId: number) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.email === userEmail) {
          const hasModule = user.unlockedModules.includes(moduleId);
          
          // If module exists, remove it, otherwise add it
          const updatedModules = hasModule
            ? user.unlockedModules.filter(id => id !== moduleId)
            : [...user.unlockedModules, moduleId];
          
          // Toast notification
          toast({
            title: `Módulo ${hasModule ? "bloqueado" : "desbloqueado"}`,
            description: `${modules.find(m => m.id === moduleId)?.title} ${hasModule ? "bloqueado" : "desbloqueado"} para ${user.email}`,
          });
          
          return { ...user, unlockedModules: updatedModules };
        }
        return user;
      })
    );
  };

  const toggleNewUserStatus = (userEmail: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.email === userEmail) {
          const updatedStatus = !user.isNewUser;
          
          toast({
            title: "Status atualizado",
            description: `${user.email} agora ${updatedStatus ? "é" : "não é mais"} um novo usuário`,
          });
          
          return { ...user, isNewUser: updatedStatus };
        }
        return user;
      })
    );
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <div className="text-dark-text">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background flex flex-col">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-dark-text">Administração de Usuários</h1>
          <Button 
            onClick={() => navigate("/membros")}
            variant="outline"
            className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
          >
            Voltar para Área de Membros
          </Button>
        </div>

        <Card className="bg-dark-background/50 border-dark-primary/20 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-dark-text">Gerencie o acesso dos usuários</CardTitle>
            <CardDescription className="text-dark-text/80">
              Controle quais módulos cada usuário tem acesso, e ajuste outras configurações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-text/50" />
              <Input
                placeholder="Buscar usuário por email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-dark-background/30 border-dark-primary/20 text-dark-text"
              />
            </div>

            <div className="rounded-md border border-dark-primary/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-dark-background/70">
                  <TableRow className="hover:bg-dark-background/60 border-dark-primary/20">
                    <TableHead className="text-dark-text w-[250px]">Usuário</TableHead>
                    <TableHead className="text-dark-text w-[150px]">Novo Usuário</TableHead>
                    {modules.map(module => (
                      <TableHead key={module.id} className="text-dark-text text-center">
                        {module.title.length > 15
                          ? module.title.substring(0, 15) + "..."
                          : module.title}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.email} className="hover:bg-dark-background/60 border-dark-primary/20">
                        <TableCell className="font-medium text-dark-text flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-dark-primary" />
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={user.isNewUser}
                              onCheckedChange={() => toggleNewUserStatus(user.email)}
                            />
                            <span className="text-dark-text/80">
                              {user.isNewUser ? "Sim" : "Não"}
                            </span>
                          </div>
                        </TableCell>
                        {modules.map(module => (
                          <TableCell key={module.id} className="text-center">
                            <Switch
                              checked={user.unlockedModules.includes(module.id)}
                              onCheckedChange={() => toggleModuleAccess(user.email, module.id)}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-dark-text/70">
                        Nenhum usuário encontrado com este termo de pesquisa
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-dark-text/70">
              Exibindo {filteredUsers.length} de {users.length} usuários
            </p>
          </CardFooter>
        </Card>

        <Card className="bg-dark-background/50 border-dark-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-dark-text">Informações</CardTitle>
            <CardDescription className="text-dark-text/80">
              Sobre o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-dark-text/90 mb-2">
              Este painel permite gerenciar o acesso dos usuários aos diferentes módulos do programa:
            </p>
            <ul className="list-disc list-inside space-y-1 text-dark-text/80 ml-4">
              <li>Ative ou desative o status de "Novo Usuário"</li>
              <li>Desbloqueie módulos específicos para cada usuário</li>
              <li>As alterações são aplicadas imediatamente</li>
            </ul>
            <p className="text-dark-text/90 mt-4 italic">
              Nota: Em um ambiente de produção, estas alterações seriam salvas em um banco de dados.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
