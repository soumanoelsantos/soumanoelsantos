
import React from 'react';
import { SwotData } from "@/types/swot";
import SwotPdfHeader from './pdf/SwotPdfHeader';
import SwotPdfCta from './pdf/SwotPdfCta';
import SwotQuadrantSection from './pdf/SwotQuadrantSection';

interface SwotQuadrantPdfPreviewProps {
  swotData: SwotData;
}

const SwotQuadrantPdfPreview: React.FC<SwotQuadrantPdfPreviewProps> = ({ swotData }) => {
  return (
    <div className="swot-pdf-container p-8 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Análise SWOT</h1>
        <p className="text-sm text-gray-600 mt-1">Quadrantes preenchidos</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Strengths */}
        <SwotQuadrantSection
          title="FORÇAS"
          description="O que temos de melhor na empresa"
          items={swotData.strengths}
          bgColor="bg-yellow-50"
          sectionKey="strength"
        />

        {/* Weaknesses */}
        <SwotQuadrantSection
          title="FRAQUEZAS"
          description="O que está ruim na empresa"
          items={swotData.weaknesses}
          bgColor="bg-gray-50"
          sectionKey="weakness"
        />
        
        {/* Opportunities */}
        <SwotQuadrantSection
          title="OPORTUNIDADES"
          description="O que acontece fora que posso aproveitar"
          items={swotData.opportunities}
          bgColor="bg-blue-50"
          sectionKey="opportunity"
        />
        
        {/* Threats */}
        <SwotQuadrantSection
          title="AMEAÇAS"
          description="O que acontece fora e pode me prejudicar"
          items={swotData.threats}
          bgColor="bg-red-50" 
          sectionKey="threat"
        />
      </div>
      
      {/* CTA Section */}
      <SwotPdfCta />
    </div>
  );
};

export default SwotQuadrantPdfPreview;
