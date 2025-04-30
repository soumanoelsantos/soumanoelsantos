
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import MemberHeader from "@/components/MemberHeader";
import { ArrowLeft, Save, Trash2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface SwotItem {
  id: string;
  text: string;
}

interface SwotData {
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
}

const AnaliseSwot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userEmail } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasSavedData, setHasSavedData] = useState<boolean>(false);

  const defaultSwotData: SwotData = {
    strengths: [
      { id: "s1", text: "" },
      { id: "s2", text: "" },
      { id: "s3", text: "" },
    ],
    weaknesses: [
      { id: "w1", text: "" },
      { id: "w2", text: "" },
      { id: "w3", text: "" },
    ],
    opportunities: [
      { id: "o1", text: "" },
      { id: "o2", text: "" },
      { id: "o3", text: "" },
    ],
    threats: [
      { id: "t1", text: "" },
      { id: "t2", text: "" },
      { id: "t3", text: "" },
    ],
  };

  const [swotData, setSwotData] = useState<SwotData>(defaultSwotData);

  // Load saved results when component mounts
  useEffect(() => {
    if (userEmail) {
      const resultsKey = `swot_analysis_${userEmail}`;
      const savedData = localStorage.getItem(resultsKey);
      
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setSwotData(parsedData);
          setHasSavedData(true);
        } catch (error) {
          console.error("Error parsing saved SWOT data:", error);
        }
      }
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso",
    });
    
    navigate("/login");
  };

  const handleItemChange = (category: keyof SwotData, id: string, value: string) => {
    setSwotData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, text: value } : item
      )
    }));
  };

  const handleAddItem = (category: keyof SwotData) => {
    const newId = `${category.charAt(0)}${swotData[category].length + 1}`;
    setSwotData(prev => ({
      ...prev,
      [category]: [...prev[category], { id: newId, text: "" }]
    }));
  };

  const handleRemoveItem = (category: keyof SwotData, id: string) => {
    if (swotData[category].length <= 1) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Você precisa manter pelo menos um item nesta categoria",
      });
      return;
    }
    
    setSwotData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const handleSaveAnalysis = () => {
    if (userEmail) {
      const resultsKey = `swot_analysis_${userEmail}`;
      localStorage.setItem(resultsKey, JSON.stringify(swotData));
      
      toast({
        title: "Análise SWOT salva",
        description: "Seus dados foram salvos com sucesso",
      });
      
      setHasSavedData(true);
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar sua análise",
      });
    }
  };

  const handleResetAnalysis = () => {
    setSwotData(defaultSwotData);
    
    if (userEmail) {
      const resultsKey = `swot_analysis_${userEmail}`;
      localStorage.removeItem(resultsKey);
      
      toast({
        title: "Análise SWOT reiniciada",
        description: "Sua análise foi apagada com sucesso",
      });
      
      setHasSavedData(false);
    }
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            className="mr-4" 
            onClick={() => navigate("/membros")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Análise SWOT</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">O que é a análise SWOT?</CardTitle>
            <CardDescription className="text-gray-600">
              A análise SWOT é uma ferramenta estratégica utilizada para avaliar os pontos fortes (Strengths), 
              pontos fracos (Weaknesses), oportunidades (Opportunities) e ameaças (Threats) de um negócio. 
              É fundamental para tomada de decisões estratégicas.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="bg-yellow-100">
              <CardTitle className="text-lg text-gray-800">FORÇAS</CardTitle>
              <CardDescription>
                O que temos de melhor na empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {swotData.strengths.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <Textarea 
                    value={item.text}
                    onChange={(e) => handleItemChange('strengths', item.id, e.target.value)}
                    placeholder="Digite um ponto forte do seu negócio..."
                    className="min-h-[80px] bg-white"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveItem('strengths', item.id)}
                    className="h-10 w-10 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={() => handleAddItem('strengths')}
                className="w-full mt-2"
              >
                Adicionar ponto forte
              </Button>
            </CardContent>
          </Card>
          
          {/* Weaknesses */}
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg text-gray-800">FRAQUEZAS</CardTitle>
              <CardDescription>
                O que está ruim na empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {swotData.weaknesses.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <Textarea 
                    value={item.text}
                    onChange={(e) => handleItemChange('weaknesses', item.id, e.target.value)}
                    placeholder="Digite um ponto fraco do seu negócio..."
                    className="min-h-[80px] bg-white"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveItem('weaknesses', item.id)}
                    className="h-10 w-10 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={() => handleAddItem('weaknesses')}
                className="w-full mt-2"
              >
                Adicionar ponto fraco
              </Button>
            </CardContent>
          </Card>
          
          {/* Opportunities */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="bg-blue-100">
              <CardTitle className="text-lg text-gray-800">OPORTUNIDADES</CardTitle>
              <CardDescription>
                O que acontece fora que posso aproveitar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {swotData.opportunities.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <Textarea 
                    value={item.text}
                    onChange={(e) => handleItemChange('opportunities', item.id, e.target.value)}
                    placeholder="Digite uma oportunidade para seu negócio..."
                    className="min-h-[80px] bg-white"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveItem('opportunities', item.id)}
                    className="h-10 w-10 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={() => handleAddItem('opportunities')}
                className="w-full mt-2"
              >
                Adicionar oportunidade
              </Button>
            </CardContent>
          </Card>
          
          {/* Threats */}
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="bg-red-100">
              <CardTitle className="text-lg text-gray-800">AMEAÇAS</CardTitle>
              <CardDescription>
                O que acontece fora e pode me prejudicar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {swotData.threats.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <Textarea 
                    value={item.text}
                    onChange={(e) => handleItemChange('threats', item.id, e.target.value)}
                    placeholder="Digite uma ameaça ao seu negócio..."
                    className="min-h-[80px] bg-white"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveItem('threats', item.id)}
                    className="h-10 w-10 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={() => handleAddItem('threats')}
                className="w-full mt-2"
              >
                Adicionar ameaça
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
          <Button 
            variant="outline" 
            onClick={handleResetAnalysis}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reiniciar análise
          </Button>
          <Button 
            onClick={handleSaveAnalysis}
            className="bg-dark-primary hover:bg-dark-primary/90 text-white flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Salvar análise
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnaliseSwot;
