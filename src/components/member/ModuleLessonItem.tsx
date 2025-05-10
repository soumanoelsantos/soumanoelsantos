
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ModuleLessonItemProps {
  lesson: {
    id: number;
    title: string;
    url: string;
    isWhatsapp: boolean;
    dataKey?: string;
    benefit?: string;
  };
  isModuleBlocked: boolean;
  completedTools: Record<string, boolean>;
}

const ModuleLessonItem: React.FC<ModuleLessonItemProps> = ({
  lesson,
  isModuleBlocked,
  completedTools
}) => {
  const navigate = useNavigate();

  const handleClickLesson = () => {
    if (lesson.isWhatsapp) {
      const message = encodeURIComponent("Olá, Manoel! Gostaria de agendar meu diagnóstico empresarial completo com você!");
      window.location.href = `https://wa.me/31986994906?text=${message}`;
    } else if (lesson.url !== "#") {
      navigate(lesson.url);
    }
  };

  // Renders a completion indicator for tools that have been completed
  const renderCompletionStatus = () => {
    // Debug the completion status of this particular lesson
    console.log(`Checking completion for "${lesson.title}" with dataKey:`, lesson.dataKey);
    console.log(`Completion status for ${lesson.dataKey}:`, lesson.dataKey ? completedTools[lesson.dataKey] : 'No dataKey');
    
    // If the lesson has a dataKey and the tool is completed, show the badge
    if (lesson.dataKey && completedTools[lesson.dataKey]) {
      return (
        <Badge className="ml-2 bg-green-500 text-white">
          <CheckCheck className="h-3 w-3 mr-1" />
          <span className="text-xs">Preenchido</span>
        </Badge>
      );
    }
    return null;
  };

  return (
    <li 
      className={`p-3 rounded-md border border-dark-primary/10 
      ${isModuleBlocked ? 'opacity-50' : 'bg-gray-50'}`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h4 className="text-gray-800 font-medium">{lesson.title}</h4>
            {renderCompletionStatus()}
            {lesson.benefit && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 p-0">
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">Ver benefício</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-[250px] bg-white">
                    <p className="text-sm">{lesson.benefit}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <Button 
            size="sm" 
            variant={isModuleBlocked ? "outline" : "default"}
            className={isModuleBlocked 
              ? "cursor-not-allowed border-dark-primary/20 text-gray-400" 
              : "bg-dark-primary hover:bg-dark-primary/90 text-white"}
            disabled={isModuleBlocked}
            onClick={handleClickLesson}
          >
            {isModuleBlocked ? "Bloqueado" : "Acessar"}
          </Button>
        </div>
        {lesson.benefit && (
          <p className="text-xs text-gray-600 italic pl-1">
            <span className="font-medium">Benefício:</span> {lesson.benefit}
          </p>
        )}
      </div>
    </li>
  );
};

export default ModuleLessonItem;
