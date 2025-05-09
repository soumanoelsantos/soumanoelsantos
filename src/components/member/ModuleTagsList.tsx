
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ModuleTagsListProps {
  tags: string[];
}

const ModuleTagsList: React.FC<ModuleTagsListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <Badge 
          key={index} 
          variant="outline" 
          className="bg-dark-primary/5 text-gray-700 hover:bg-dark-primary/10 border-dark-primary/20 text-xs py-1"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default ModuleTagsList;
