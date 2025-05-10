
import React from 'react';
import { Card } from '@/components/ui/card';

interface ResultsCardProps {
  title: string;
  score: number;
  observations: string[];
}

const ResultsCard = ({ title, score, observations }: ResultsCardProps) => {
  return (
    <div className="border rounded-md shadow-sm bg-white">
      <div className="bg-[#1d365c] p-4 rounded-t-md">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Pontuação:</span>
          <span className="text-xl font-bold">{score}%</span>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Observações:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {observations.map((observation, index) => (
              <li key={index} className="text-sm text-gray-600">{observation}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
