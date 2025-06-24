
import React from "react";
import MemberContentList from "@/components/MemberContentList";
import DashboardCard from "@/components/member/DashboardCard";
import ActionCalendarManager from "@/components/action-calendar/ActionCalendarManager";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MemberAreaContent: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-gray-800 mb-8 text-center`}>
        Área de Membros
      </h1>
      
      <div className="grid grid-cols-1 gap-8">
        <DashboardCard />
        
        {/* Card para Calendário de Ações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendário de Ações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActionCalendarManager />
          </CardContent>
        </Card>
        
        {/* Card para Processos Documentados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Processos Documentados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Crie e gerencie documentos de processos da sua empresa como playbooks de vendas, diretrizes e padronizações
            </p>
            <Button 
              onClick={() => navigate('/processos-documentados')} 
              className="w-full"
            >
              Acessar Processos Documentados
            </Button>
          </CardContent>
        </Card>
        
        {/* Card para Mapas Mentais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Mapas Mentais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Crie e gerencie mapas mentais para organizar ideias e compartilhar com sua equipe
            </p>
            <Button 
              onClick={() => navigate('/mapa-mental')} 
              className="w-full"
            >
              Acessar Mapas Mentais
            </Button>
          </CardContent>
        </Card>
        
        <MemberContentList />
      </div>
    </div>
  );
};

export default MemberAreaContent;
