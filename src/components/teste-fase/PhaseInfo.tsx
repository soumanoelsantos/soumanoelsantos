
import React from "react";

interface PhaseInfoProps {
  phaseName: string;
  score: number;
  description: string;
}

const PhaseInfo = ({ phaseName, score, description }: PhaseInfoProps) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">
        Sua empresa está na: {phaseName}
      </h2>
      <p className="text-gray-700 mb-2">
        Compatibilidade com esta fase: {Math.round(score)}%
      </p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default PhaseInfo;
