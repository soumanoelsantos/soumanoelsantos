
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle } from "lucide-react";
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

  // Debug log to check if the completedTools data is correctly passed
  useEffect(() => {
    if (lesson.dataKey) {
      console.log(`ModuleLessonItem: "${lesson.title}" with dataKey "${lesson.dataKey}"`, 
        completedTools[lesson.dataKey] ? "is completed" : "is not completed",
        { completionValue: completedTools[lesson.dataKey], allCompletedTools: completedTools }
      );
    }
  }, [lesson, completedTools]);

  const handleClickLesson = () => {
    if (lesson.isWhatsapp) {
      const message = encodeURIComponent("Olá, Manoel! Gostaria de agendar meu diagnóstico empresarial completo com você!");
      window.location.href = `https://wa.me/31986994906?text=${message}`;
    } else if (lesson.url !== "#") {
      navigate(lesson.url);
    }
  };

  // Check if this lesson is completed
  const isCompleted = lesson.dataKey ? completedTools[lesson.dataKey] : false;

  return (
    <li 
      className={`p-3 rounded-md border ${isCompleted ? 'border-green-500/30' : 'border-dark-primary/10'} 
      ${isModuleBlocked ? 'opacity-50' : isCompleted ? 'bg-green-50' : 'bg-gray-50'}`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-wrap">
            <div className="flex items-center">
              {isCompleted && (
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              )}
              <h4 className="text-gray-800 font-medium">{lesson.title}</h4>
            </div>
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
            variant={isModuleBlocked ? "outline" : isCompleted ? "outline" : "default"}
            className={isModuleBlocked 
              ? "cursor-not-allowed border-dark-primary/20 text-gray-400" 
              : isCompleted
                ? "border-green-500 text-green-600 hover:bg-green-50"
                : "bg-dark-primary hover:bg-dark-primary/90 text-white"}
            disabled={isModuleBlocked}
            onClick={handleClickLesson}
          >
            {isModuleBlocked ? "Bloqueado" : isCompleted ? "Ver diagnóstico" : "Acessar"}
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
