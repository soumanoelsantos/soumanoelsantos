
import React, { useState, useEffect } from "react";
import { Accordion } from "@/components/ui/accordion";
import { useAuth } from "@/hooks/useAuth";
import { useToolCompletionCheck } from "@/hooks/useToolCompletionCheck";
import ModuleAccordionItem from "./member/ModuleAccordionItem";
import { programModules } from "@/data/programModules";

const MemberContentList = () => {
  const [expandedModule, setExpandedModule] = useState<string>("item-0");
  const { userId } = useAuth();
  const { completedTools, isLoading } = useToolCompletionCheck(userId);

  // Debug log to check the completion status after loading
  useEffect(() => {
    if (!isLoading) {
      console.log("MemberContentList - Completed tools data:", completedTools);
    }
  }, [completedTools, isLoading]);

  if (isLoading) {
    return <div className="py-4 text-gray-500">Carregando conteúdos...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Módulos do programa</h2>
      
      <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
        {programModules.map((module) => (
          <ModuleAccordionItem
            key={module.id}
            module={module}
            completedTools={completedTools}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default MemberContentList;
