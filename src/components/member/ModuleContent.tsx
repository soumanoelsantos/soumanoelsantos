
import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import ModuleLessonItem from "./ModuleLessonItem";

interface ModuleContentProps {
  module: {
    id: number;
    title: string;
    description: string;
    status: string;
    tags?: string[];
    lessons: {
      id: number;
      title: string;
      url: string;
      isWhatsapp: boolean;
      dataKey?: string;
      benefit?: string;
    }[];
  };
  completedTools: Record<string, boolean>;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ module, completedTools }) => {
  const isModuleBlocked = module.status === 'bloqueado';
  
  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="pt-0 px-0">
        <CardDescription className="text-gray-600">
          {module.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="space-y-2">
          {module.lessons.map((lesson) => (
            <ModuleLessonItem
              key={lesson.id}
              lesson={lesson}
              isModuleBlocked={isModuleBlocked}
              completedTools={completedTools}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ModuleContent;
