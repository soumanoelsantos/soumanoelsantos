
import React from 'react';
import DiagnosticSection from '@/components/DiagnosticSection';

interface DiagnosticSectionsProps {
  sections: {
    [key: string]: {
      title: string;
      questions: string[];
      pointValue: number;
    };
  };
  results: {
    processos: { score: number; total: number; percentage: number };
    resultados: { score: number; total: number; percentage: number };
    sistemaGestao: { score: number; total: number; percentage: number };
    pessoas: { score: number; total: number; percentage: number };
  };
  setResults: React.Dispatch<React.SetStateAction<{
    processos: { score: number; total: number; percentage: number };
    resultados: { score: number; total: number; percentage: number };
    sistemaGestao: { score: number; total: number; percentage: number };
    pessoas: { score: number; total: number; percentage: number };
  }>>;
  setAnswersData: React.Dispatch<React.SetStateAction<{
    [key: string]: {
      title: string;
      answers: { question: string; answer: string }[];
    };
  }>>;
}

const DiagnosticSections = ({ sections, results, setResults, setAnswersData }: DiagnosticSectionsProps) => {
  return (
    <div className="space-y-8 my-8">
      {Object.entries(sections).map(([key, section]) => (
        <DiagnosticSection 
          key={key}
          section={section} 
          results={results}
          setResults={setResults}
          sectionKey={key}
          setAnswersData={setAnswersData}
        />
      ))}
    </div>
  );
};

export default DiagnosticSections;
