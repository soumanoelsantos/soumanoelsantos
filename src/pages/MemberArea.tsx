
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import MemberHeader from "@/components/MemberHeader";
import MemberContentList from "@/components/MemberContentList";
import { ArrowRight, Calendar } from "lucide-react";

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
  
  const handleScheduleClick = () => {
    const message = encodeURIComponent("Olá, Manoel! Gostaria de agendar meu diagnóstico gratuito com você!");
    window.location.href = `https://wa.me/31986994906?text=${message}`;
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
      
      {/* Hero section identical to the image */}
      <div className="w-full bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Transforme sua empresa em<br />
            uma <span className="text-[#D4AF37]">máquina de vendas</span>
          </h1>
          
          <div className="max-w-4xl mx-auto bg-[#111111]/80 p-6 rounded-lg backdrop-blur-sm border border-white/10 mb-12">
            <p className="text-lg md:text-xl text-white">
              Em 45 minutos, farei um plano de ação <strong className="text-white">GRATUITO</strong> de vendas, marketing e gestão para a sua empresa <strong className="text-white">DOBRAR</strong> o faturamento em 90 dias.
            </p>
          </div>
          
          <Button 
            onClick={handleScheduleClick}
            className="bg-[#D4AF37] hover:bg-[#C4A030] text-black font-semibold rounded-full px-8 py-6 text-lg flex items-center mx-auto gap-2"
          >
            <Calendar className="h-5 w-5" />
            Agendar diagnóstico gratuito
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          <p className="text-white/70 mt-4">
            Clique acima e agende agora – As vagas são limitadas!
          </p>
        </div>
      </div>
      
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
