
import React, { useState, useEffect } from "react";
import { Accordion } from "@/components/ui/accordion";
import { useAuth } from "@/hooks/useAuth";
import { useToolCompletionCheck } from "@/hooks/useToolCompletionCheck";
import ModuleAccordionItem from "./member/ModuleAccordionItem";
import { programModules } from "@/data/programModules";
import { supabase } from "@/integrations/supabase/client";

const MemberContentList = () => {
  const [expandedModule, setExpandedModule] = useState<string>("item-0");
  const { userId } = useAuth();
  const { completedTools, isLoading: toolsLoading } = useToolCompletionCheck(userId);
  const [unlockedModules, setUnlockedModules] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's unlocked modules
  useEffect(() => {
    if (!userId) return;

    const fetchUnlockedModules = async () => {
      try {
        setIsLoading(true);
        
        // Query user_modules to get the modules this user has access to
        const { data, error } = await supabase
          .from('user_modules')
          .select('module_id')
          .eq('user_id', userId);
        
        if (error) throw error;
        
        // Transform the data to get just the module IDs
        const moduleIds = data ? data.map(item => item.module_id) : [];
        console.log("User's unlocked modules:", moduleIds);
        
        setUnlockedModules(moduleIds);
      } catch (error) {
        console.error("Error fetching user's modules:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUnlockedModules();
  }, [userId]);

  // Debug log to check the completion status after loading
  useEffect(() => {
    if (!isLoading && !toolsLoading) {
      console.log("MemberContentList - Completed tools data:", completedTools);
      console.log("MemberContentList - Unlocked modules:", unlockedModules);
    }
  }, [completedTools, unlockedModules, isLoading, toolsLoading]);

  if (isLoading || toolsLoading) {
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
            isUnlocked={unlockedModules.includes(module.id)}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default MemberContentList;
