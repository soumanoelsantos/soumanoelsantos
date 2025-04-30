import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Sample program modules and content
const programModules = [
  {
    id: 0,
    title: "Ferramentas",
    description: "Ferramentas de diagnóstico e análise para sua empresa",
    status: "disponível",
    lessons: [
      { id: 1, title: "Diagnóstico do Negócio", url: "/teste", isWhatsapp: false },
      { id: 2, title: "Check List de Contratação", url: "/checklist-contratacao", isWhatsapp: false },
      { id: 3, title: "Análise SWOT", url: "/analise-swot", isWhatsapp: false },
      { id: 4, title: "Teste Fase da Empresa", url: "/teste-fase", isWhatsapp: false },
      { id: 5, title: "Mapa do Negócio", url: "/mapa-negocio", isWhatsapp: false },
    ]
  },
  {
    id: 1,
    title: "Módulo 1 - Diagnóstico e Estratégia",
    description: "Entendendo seu negócio e traçando o plano de 90 dias",
    status: "bloqueado",
    lessons: [
      { id: 101, title: "Diagnóstico empresarial completo", url: "#", isWhatsapp: false },
      { id: 102, title: "Definindo metas SMART para 90 dias", url: "#", isWhatsapp: false },
      { id: 103, title: "Criando seu plano de ação", url: "#", isWhatsapp: false },
      { id: 104, title: "Workshop: Análise SWOT da sua empresa", url: "#", isWhatsapp: false },
    ]
  },
  {
    id: 2,
    title: "Módulo 2 - Sistema de Vendas",
    description: "Implementando um funil de vendas eficiente",
    status: "bloqueado",
    lessons: [
      { id: 201, title: "Estruturando seu funil de vendas", url: "#", isWhatsapp: false },
      { id: 202, title: "Script de vendas de alto impacto", url: "#", isWhatsapp: false },
      { id: 203, title: "Técnicas de fechamento avançadas", url: "#", isWhatsapp: false },
      { id: 204, title: "Objeções: como transformá-las em vendas", url: "#", isWhatsapp: false },
    ]
  },
  {
    id: 3,
    title: "Módulo 3 - Marketing Digital",
    description: "Atraindo leads qualificados para seu negócio",
    status: "bloqueado",
    lessons: [
      { id: 301, title: "Estratégia de marketing de conteúdo", url: "#", isWhatsapp: false },
      { id: 302, title: "Tráfego pago: Facebook e Instagram Ads", url: "#", isWhatsapp: false },
      { id: 303, title: "Copywriting para conversão", url: "#", isWhatsapp: false },
      { id: 304, title: "Automação de marketing", url: "#", isWhatsapp: false },
    ]
  },
  {
    id: 4,
    title: "Módulo 4 - Gestão e Escalabilidade",
    description: "Estruturando sua empresa para crescer",
    status: "bloqueado",
    lessons: [
      { id: 401, title: "KPIs essenciais para seu negócio", url: "#", isWhatsapp: false },
      { id: 402, title: "Processos e operações eficientes", url: "#", isWhatsapp: false },
      { id: 403, title: "Recrutamento e gestão de equipe", url: "#", isWhatsapp: false },
      { id: 404, title: "Plano de crescimento sustentável", url: "#", isWhatsapp: false },
    ]
  }
];

const MemberContentList = () => {
  const [expandedModule, setExpandedModule] = useState<string>("item-0");
  const navigate = useNavigate();
  const { isNewUser } = useAuth();

  const handleClickLesson = (lesson: { url: string, isWhatsapp: boolean }) => {
    if (lesson.isWhatsapp) {
      const message = encodeURIComponent("Olá, Manoel! Gostaria de agendar meu diagnóstico empresarial completo com você!");
      window.location.href = `https://wa.me/31986994906?text=${message}`;
    } else if (lesson.url !== "#") {
      navigate(lesson.url);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completo":
        return <Badge className="bg-green-600 text-white hover:bg-green-600" variant="outline">Completo</Badge>;
      case "em andamento":
        return <Badge className="bg-yellow-500 text-gray-800 hover:bg-yellow-500" variant="outline">Em andamento</Badge>;
      case "bloqueado":
        return <Badge className="bg-gray-500/80 text-white hover:bg-gray-500/80" variant="outline">Bloqueado</Badge>;
      case "disponível":
        return <Badge className="bg-blue-600 text-white hover:bg-blue-600" variant="outline">Disponível</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Módulos do programa</h2>
      
      <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
        {programModules.map((module) => (
          <AccordionItem 
            key={module.id} 
            value={`item-${module.id}`} 
            className="border-dark-primary/20"
          >
            <AccordionTrigger className="text-gray-800 hover:text-dark-primary">
              <div className="flex items-center justify-between w-full pr-4">
                <span>{module.title}</span>
                <div className="flex-shrink-0 ml-2">
                  {getStatusBadge(module.status)}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="pt-0 px-0">
                  <CardDescription className="text-gray-600">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <li 
                        key={lesson.id}
                        className={`p-3 rounded-md border border-dark-primary/10 
                        ${module.status === 'bloqueado' ? 'opacity-50' : 'bg-gray-50'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-gray-800 font-medium">{lesson.title}</h4>
                          </div>
                          <Button 
                            size="sm" 
                            variant={module.status === 'bloqueado' ? "outline" : "default"}
                            className={module.status === 'bloqueado' 
                              ? "cursor-not-allowed border-dark-primary/20 text-gray-400" 
                              : "bg-dark-primary hover:bg-dark-primary/90 text-white"}
                            disabled={module.status === 'bloqueado'}
                            onClick={() => handleClickLesson(lesson)}
                          >
                            {module.status === 'bloqueado' ? "Bloqueado" : "Acessar"}
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MemberContentList;
