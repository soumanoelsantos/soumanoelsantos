
import React, { forwardRef } from 'react';
import { SwotData } from "@/types/swot";
import StrategyCategorySection from './pdf/StrategyCategorySection';
import SwotPdfHeader from './pdf/SwotPdfHeader';
import SwotPdfCta from './pdf/SwotPdfCta';

interface SwotPdfPreviewProps {
  swotData: SwotData;
  actionPlan: Record<string, string[]>;
}

const SwotPdfPreview = forwardRef<HTMLDivElement, SwotPdfPreviewProps>(
  ({ actionPlan, swotData }, ref) => {
  
  return (
    <div ref={ref} className="swot-pdf-container p-8 bg-white">
      <SwotPdfHeader />
      
      {/* SO Strategies */}
      <StrategyCategorySection
        title="Estratégias SO (Forças + Oportunidades)"
        description="Ações para usar suas forças para aproveitar oportunidades"
        strategies={actionPlan.strengthsOpportunities || []}
        category="strengthsOpportunities"
        bgColor="bg-green-50"
        borderColor="border-green-400"
        sectionKey="so"
      />

      {/* ST Strategies */}
      <StrategyCategorySection
        title="Estratégias ST (Forças + Ameaças)"
        description="Ações para usar suas forças para reduzir o impacto das ameaças"
        strategies={actionPlan.strengthsThreats || []}
        category="strengthsThreats"
        bgColor="bg-yellow-50"
        borderColor="border-yellow-400"
        sectionKey="st"
      />
      
      {/* WO Strategies */}
      <StrategyCategorySection
        title="Estratégias WO (Fraquezas + Oportunidades)"
        description="Ações para superar fraquezas aproveitando oportunidades"
        strategies={actionPlan.weaknessesOpportunities || []}
        category="weaknessesOpportunities"
        bgColor="bg-blue-50"
        borderColor="border-blue-400"
        sectionKey="wo"
      />
      
      {/* WT Strategies */}
      <StrategyCategorySection
        title="Estratégias WT (Fraquezas + Ameaças)"
        description="Ações para minimizar fraquezas e evitar ameaças"
        strategies={actionPlan.weaknessesThreats || []}
        category="weaknessesThreats"
        bgColor="bg-red-50"
        borderColor="border-red-400"
        sectionKey="wt"
      />
      
      {/* CTA Section */}
      <SwotPdfCta />
    </div>
  );
});

SwotPdfPreview.displayName = 'SwotPdfPreview';

export default SwotPdfPreview;
