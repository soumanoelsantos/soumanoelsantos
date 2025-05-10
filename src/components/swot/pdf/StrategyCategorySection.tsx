
import React from 'react';
import { StrategyHelpContent } from './SwotPdfHelpContent';

interface StrategyCategorySectionProps {
  title: string;
  description: string;
  strategies: string[];
  category: string;
  bgColor: string;
  borderColor: string;
  sectionKey: string;
}

const StrategyCategorySection: React.FC<StrategyCategorySectionProps> = ({
  title,
  description,
  strategies,
  category,
  bgColor,
  borderColor,
  sectionKey
}) => {
  if (!strategies || strategies.length === 0) return null;
  
  return (
    <div className="mb-8">
      <h2 className={`text-lg font-semibold text-gray-800 mb-2 ${bgColor} p-2`}>
        {title}
      </h2>
      <p className="text-sm text-gray-600 italic mb-3">
        {description}
      </p>
      <ul className="space-y-1">
        {strategies.map((strategy, index) => (
          <li key={`pdf-${sectionKey}-${index}`} className="p-2 text-gray-700 mb-5">
            <div className="font-medium">• {strategy}</div>
            <StrategyHelpContent
              strategy={strategy}
              category={category}
              borderColor={borderColor}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrategyCategorySection;
