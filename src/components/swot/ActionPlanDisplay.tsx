
import React from 'react';

interface ActionPlanDisplayProps {
  actionPlan: Record<string, string[]>;
}

const ActionPlanDisplay: React.FC<ActionPlanDisplayProps> = ({ actionPlan }) => {
  return (
    <div className="space-y-6">
      {/* SO Strategies */}
      {actionPlan.strengthsOpportunities && actionPlan.strengthsOpportunities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias SO (Forças + Oportunidades)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para usar suas forças para aproveitar oportunidades
          </p>
          <ul className="space-y-2">
            {actionPlan.strengthsOpportunities?.map((strategy, index) => (
              <li key={`so-${index}`} className="bg-green-50 border border-green-100 p-3 rounded-md text-gray-700">
                {strategy}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ST Strategies */}
      {actionPlan.strengthsThreats && actionPlan.strengthsThreats.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias ST (Forças + Ameaças)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para usar suas forças para reduzir o impacto das ameaças
          </p>
          <ul className="space-y-2">
            {actionPlan.strengthsThreats?.map((strategy, index) => (
              <li key={`st-${index}`} className="bg-yellow-50 border border-yellow-100 p-3 rounded-md text-gray-700">
                {strategy}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* WO Strategies */}
      {actionPlan.weaknessesOpportunities && actionPlan.weaknessesOpportunities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias WO (Fraquezas + Oportunidades)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para superar fraquezas aproveitando oportunidades
          </p>
          <ul className="space-y-2">
            {actionPlan.weaknessesOpportunities?.map((strategy, index) => (
              <li key={`wo-${index}`} className="bg-blue-50 border border-blue-100 p-3 rounded-md text-gray-700">
                {strategy}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* WT Strategies */}
      {actionPlan.weaknessesThreats && actionPlan.weaknessesThreats.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Estratégias WT (Fraquezas + Ameaças)</h3>
          <p className="text-sm text-gray-600 italic mb-3">
            Ações para minimizar fraquezas e evitar ameaças
          </p>
          <ul className="space-y-2">
            {actionPlan.weaknessesThreats?.map((strategy, index) => (
              <li key={`wt-${index}`} className="bg-red-50 border border-red-100 p-3 rounded-md text-gray-700">
                {strategy}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionPlanDisplay;
