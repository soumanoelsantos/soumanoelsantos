
import React from "react";
import ModuleLessonItem from "./ModuleLessonItem";

interface ModuleContentProps {
  module: {
    id: number;
    lessons?: any[];
  };
  completedTools: Record<string, boolean>;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ module, completedTools }) => {
  const { lessons = [] } = module;
  
  return (
    <div className="space-y-4">
      {lessons.length > 0 ? (
        <div className="space-y-3">
          {lessons.map((lesson, index) => (
            <ModuleLessonItem 
              key={index}
              lesson={lesson}
              isCompleted={completedTools[`module_${module.id}_lesson_${index}`] || false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          <p>Nenhuma lição disponível.</p>
        </div>
      )}
    </div>
  );
};

export default ModuleContent;
