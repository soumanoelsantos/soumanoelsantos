
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ModuleStatusBadge from "./ModuleStatusBadge";
import ModuleContent from "./ModuleContent";

interface ModuleAccordionItemProps {
  module: {
    id: number;
    title: string;
    description: string;
    status?: string;
    lessons?: any[];
  };
  completedTools: Record<string, boolean>;
  isUnlocked?: boolean;
}

const ModuleAccordionItem: React.FC<ModuleAccordionItemProps> = ({ 
  module, 
  completedTools,
  isUnlocked = false
}) => {
  // Determine if this is the tools module (id === 0)
  const isToolsModule = module.id === 0;
  
  // Tools module is always unlocked, other modules depend on isUnlocked prop
  const moduleStatus = isToolsModule || isUnlocked ? "disponível" : "bloqueado";
  
  return (
    <AccordionItem value={`item-${module.id}`} className="border rounded-lg mb-4 overflow-hidden">
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
        <div className="flex justify-between w-full items-center">
          <h3 className="text-lg font-semibold text-left text-gray-800">{module.title}</h3>
          <ModuleStatusBadge status={moduleStatus} />
        </div>
      </AccordionTrigger>
      
      <AccordionContent>
        <div className="p-4 bg-white">
          <p className="text-gray-600 mb-4">{module.description}</p>
          
          {(isToolsModule || isUnlocked) ? (
            <ModuleContent 
              module={module} 
              completedTools={completedTools}
            />
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-center text-gray-600">
                Este módulo está bloqueado. Entre em contato com o administrador para liberar acesso.
              </p>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ModuleAccordionItem;
