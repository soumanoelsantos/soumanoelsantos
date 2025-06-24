
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, BarChart3, Target, FileText, Lightbulb, Brain, Layers, CheckSquare, ClipboardList, Book, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import ModuleContent from './ModuleContent';
import ProgressCard from './ProgressCard';
import DashboardCard from './DashboardCard';
import MentorshipCard from './MentorshipCard';
import ActionCalendarManager from '@/components/action-calendar/ActionCalendarManager';
import { useAuth } from '@/hooks/useAuth';
import { useCompletionPercentage } from '@/hooks/useCompletionPercentage';
import { useToolCompletionCheck } from '@/hooks/useToolCompletionCheck';
import { programModules } from '@/data/programModules';

const MemberAreaContent = () => {
  const { userId } = useAuth();
  const { completionPercent } = useCompletionPercentage(userId);
  const { completedTools } = useToolCompletionCheck(userId);

  // Get the first module as the main module to display
  const mainModule = programModules[0];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProgressCard completionPercent={completionPercent} />
        <DashboardCard />
        <MentorshipCard />
      </div>

      {/* Calendário de Ações */}
      <ActionCalendarManager />

      {/* Ferramentas Estratégicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Ferramentas Estratégicas
          </CardTitle>
          <CardDescription>
            Acesse as principais ferramentas para análise e planejamento estratégico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/swot">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-blue-50">
                <Target className="h-6 w-6" />
                <span className="text-sm font-medium">Análise SWOT</span>
              </Button>
            </Link>

            <Link to="/canvas">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-green-50">
                <Layers className="h-6 w-6" />
                <span className="text-sm font-medium">Canvas</span>
              </Button>
            </Link>

            <Link to="/puv">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-purple-50">
                <Lightbulb className="h-6 w-6" />
                <span className="text-sm font-medium">Proposta Única de Valor</span>
              </Button>
            </Link>

            <Link to="/mapa-equipe">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-orange-50">
                <Users className="h-6 w-6" />
                <span className="text-sm font-medium">Mapa da Equipe</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Ferramentas de Gestão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Ferramentas de Gestão
          </CardTitle>
          <CardDescription>
            Gerencie e acompanhe o desempenho do seu negócio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/crm">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-blue-50">
                <Users className="h-6 w-6" />
                <span className="text-sm font-medium">CRM</span>
              </Button>
            </Link>

            <Link to="/mapa-mental">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-green-50">
                <Brain className="h-6 w-6" />
                <span className="text-sm font-medium">Mapas Mentais</span>
              </Button>
            </Link>

            <Link to="/processos-documentados">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-purple-50">
                <Book className="h-6 w-6" />
                <span className="text-sm font-medium">Processos</span>
              </Button>
            </Link>

            <Link to="/diagnostic">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-orange-50">
                <CheckSquare className="h-6 w-6" />
                <span className="text-sm font-medium">Diagnóstico</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo do Programa */}
      {mainModule && (
        <ModuleContent 
          module={mainModule} 
          completedTools={completedTools} 
        />
      )}
    </div>
  );
};

export default MemberAreaContent;
