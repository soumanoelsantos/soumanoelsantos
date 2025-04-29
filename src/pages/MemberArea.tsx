
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import MemberHeader from "@/components/MemberHeader";
import MemberContentList from "@/components/MemberContentList";

const MemberArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const email = localStorage.getItem("userEmail");
    
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login");
      return;
    }
    
    setUserEmail(email);
    setIsLoading(false);
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso",
    });
    
    navigate("/login");
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
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-dark-text mb-8 text-center">Área de Membros</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-dark-background/50 border-dark-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-dark-text">Bem-vindo ao Programa Maximus</CardTitle>
              <CardDescription className="text-dark-text/80">
                Aqui você encontra todo o conteúdo para transformar sua empresa em uma máquina de vendas
              </CardDescription>
            </CardHeader>
            <CardContent className="text-dark-text/90">
              <p className="mb-4">Este é o início da sua jornada para dobrar o faturamento da sua empresa nos próximos 90 dias.</p>
              <p>Explore os módulos abaixo para acessar todo o conteúdo do programa.</p>
            </CardContent>
          </Card>
          
          <MemberContentList />
          
          <Card className="bg-dark-background/50 border-dark-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-dark-text">Mentoria individual</CardTitle>
              <CardDescription className="text-dark-text/80">
                Agende sua próxima mentoria com o Manoel Santos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-dark-text/90 mb-4">
                As mentorias individuais são realizadas semanalmente e são fundamentais para o seu sucesso no programa.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-dark-primary hover:bg-dark-primary/90 text-dark-background"
                onClick={() => window.open("https://wa.me/31986994906", "_blank")}
              >
                Agendar mentoria
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemberArea;
