
import React from "react";
import { Activity } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";
import InvestmentVisibilityCard from "@/components/marketing/cards/InvestmentVisibilityCard";
import PredictabilityCard from "@/components/marketing/cards/PredictabilityCard";
import SolutionsCard from "@/components/marketing/cards/SolutionsCard";
import CroRoleCard from "@/components/marketing/cards/CroRoleCard";
import ActionCallCard from "@/components/marketing/cards/ActionCallCard";

const MarketingPainSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            <span className="text-red-500">A Dor do Empresário</span> que Investe no Marketing às Cegas
          </h2>
          
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-10">
            {/* Main content cards */}
            <InvestmentVisibilityCard />
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <PredictabilityCard />
            </div>
            
            <SolutionsCard />
            
            <CroRoleCard />
            
            <ActionCallCard />

            <div className="flex justify-center mt-8">
              <LeadCaptureForm 
                source="marketing_pain_section"
                buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-lg py-6 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
                buttonText={
                  <>
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </span>
                    QUERO MEU PLANO DE AÇÃO COMERCIAL GRATUITO
                    <span className="ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </>
                }
              />
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-3 mb-6 bg-blue-900/20 p-4 rounded-lg">
            <Activity className="text-dark-primary h-6 w-6" />
            <p className="text-lg">
              <strong>Metodologia comprovada</strong> para transformar incertezas em previsibilidade de resultados
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingPainSection;
