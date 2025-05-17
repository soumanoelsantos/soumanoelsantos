
import React from "react";

interface ModuleLessonItemProps {
  lesson: {
    id?: number;
    title: string;
    url?: string;
    isWhatsapp?: boolean;
    dataKey?: string;
    benefit?: string;
  };
  isCompleted?: boolean;
}

const ModuleLessonItem: React.FC<ModuleLessonItemProps> = ({ lesson, isCompleted }) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <h4 className="font-medium text-gray-800">{lesson.title}</h4>
      {lesson.benefit && (
        <p className="text-sm text-gray-600 mt-1">{lesson.benefit}</p>
      )}
      {isCompleted && (
        <div className="mt-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Concluído
          </span>
        </div>
      )}
    </div>
  );
};

export default ModuleLessonItem;
