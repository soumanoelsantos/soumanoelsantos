
import React from 'react';
import { SwotItem } from '@/types/swot';

interface SwotQuadrantSectionProps {
  title: string;
  description: string;
  items: SwotItem[];
  bgColor: string;
  sectionKey: string;
}

const SwotQuadrantSection: React.FC<SwotQuadrantSectionProps> = ({
  title,
  description,
  items,
  bgColor,
  sectionKey
}) => {
  return (
    <div className="mb-8">
      <h2 className={`text-lg font-semibold text-gray-800 mb-2 ${bgColor} p-2`}>{title}</h2>
      <p className="text-sm text-gray-600 italic mb-3">
        {description}
      </p>
      <ul className="space-y-1">
        {items.map((item, index) => (
          item.text && (
            <li key={`pdf-${sectionKey}-${index}`} className="p-2 text-gray-700">
              • {item.text}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default SwotQuadrantSection;
