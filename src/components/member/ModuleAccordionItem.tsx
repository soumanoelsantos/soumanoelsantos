
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ModuleStatusBadge from "./ModuleStatusBadge";
import ModuleContent from "./ModuleContent";

interface ModuleAccordionItemProps {
  module: {
    id: number;
    title: string;
    description: string;
    status: string;
    lessons: {
      id: number;
      title: string;
      url: string;
      isWhatsapp: boolean;
      dataKey?: string;
    }[];
  };
  completedTools: Record<string, boolean>;
}

const ModuleAccordionItem: React.FC<ModuleAccordionItemProps> = ({ module, completedTools }) => {
  return (
    <AccordionItem 
      key={module.id} 
      value={`item-${module.id}`} 
      className="border-dark-primary/20"
    >
      <AccordionTrigger className="text-gray-800 hover:text-dark-primary">
        <div className="flex items-center justify-between w-full pr-4">
          <span>{module.title}</span>
          <div className="flex-shrink-0 ml-2">
            <ModuleStatusBadge status={module.status} />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ModuleContent 
          module={module} 
          completedTools={completedTools} 
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default ModuleAccordionItem;
