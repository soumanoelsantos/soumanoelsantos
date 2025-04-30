
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Área de Membros</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Bem-vindo ao Programa Maximus</CardTitle>
              <CardDescription className="text-gray-600">
                {/* Removed text as requested */}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-700">
              {/* Removed text as requested */}
            </CardContent>
          </Card>
          
          <MemberContentList />
          
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Mentoria individual</CardTitle>
              <CardDescription className="text-gray-600">
                Agende sua próxima mentoria com o Manoel Santos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                As mentorias individuais são realizadas semanalmente e são fundamentais para o seu sucesso no programa.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-dark-primary hover:bg-dark-primary/90 text-white"
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
