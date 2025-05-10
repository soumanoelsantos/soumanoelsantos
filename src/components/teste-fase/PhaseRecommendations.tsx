
import React from "react";

interface PhaseRecommendationsProps {
  recommendations: string[];
}

const PhaseRecommendations = ({ recommendations }: PhaseRecommendationsProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Recomendações para esta fase:</h3>
      <ul className="list-disc pl-5 space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="text-gray-700">{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default PhaseRecommendations;
