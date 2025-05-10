
import React from "react";

interface ModuleTagsListProps {
  tags: string[];
}

const ModuleTagsList: React.FC<ModuleTagsListProps> = ({ tags }) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">Tópicos:</h4>
      <ul className="list-disc pl-5 text-gray-600 text-sm">
        {tags.map((tag, index) => (
          <li key={index} className="mb-1">{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleTagsList;
