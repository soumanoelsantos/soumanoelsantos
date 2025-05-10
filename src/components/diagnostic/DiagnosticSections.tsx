
import React, { useEffect, useState } from 'react';
import DiagnosticSection from '@/components/DiagnosticSection';
import { Button } from '@/components/ui/button';
import ActionButton from '@/components/ui/action-button';
import { CheckCircle } from 'lucide-react';

interface DiagnosticSectionsProps {
  sections: {
    [key: string]: {
      title: string;
      questions: string[];
      pointValue: number;
    };
  };
  answersData: any;
  setAnswersData: (answersData: any) => void;
  onSubmit: (results: any, answersData: any) => void;
}

const DiagnosticSections = ({ 
  sections, 
  answersData, 
  setAnswersData, 
  onSubmit 
}: DiagnosticSectionsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Debug logging
  useEffect(() => {
    console.log("DiagnosticSections rendered with answersData:", answersData);
  }, [answersData]);

  // Calculate results based on answersData
  const calculateResults = () => {
    const results: any = {};
    let totalScore = 0;
    let maxPossibleScore = 0;

    Object.entries(sections).forEach(([key, section]) => {
      if (answersData[key] && answersData[key].answers) {
        const sectionAnswers = answersData[key].answers;
        let score = 0;
        
        sectionAnswers.forEach((answerData: any) => {
          if (answerData.answer === 'satisfactory') {
            score += section.pointValue;
          } else if (answerData.answer === 'unsatisfactory') {
            score += section.pointValue / 2;
          }
        });
        
        const total = section.questions.length * section.pointValue;
        const percentage = Math.round((score / total) * 100) || 0;
        
        results[key] = {
          score,
          total,
          percentage
        };
        
        totalScore += score;
        maxPossibleScore += total;
      }
    });

    results.totalScore = totalScore;
    results.maxPossibleScore = maxPossibleScore;
    
    return results;
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const results = calculateResults();
      console.log("Submitting diagnostic with results:", results);
      console.log("And answersData:", answersData);
      onSubmit(results, answersData);
    } catch (error) {
      console.error("Error submitting diagnostic results:", error);
    }
  };
  
  // Check if we have answers for all sections to enable submit
  const isFormComplete = () => {
    return Object.keys(sections).every(key => 
      answersData[key] && 
      answersData[key].answers && 
      answersData[key].answers.length === sections[key].questions.length
    );
  };

  return (
    <div className="space-y-8">
      {Object.entries(sections).map(([key, section]) => (
        <DiagnosticSection 
          key={key}
          section={section} 
          sectionKey={key}
          results={{
            processos: { score: 0, total: 0, percentage: 0 },
            resultados: { score: 0, total: 0, percentage: 0 },
            sistemaGestao: { score: 0, total: 0, percentage: 0 },
            pessoas: { score: 0, total: 0, percentage: 0 }
          }}
          setResults={() => {}}
          setAnswersData={setAnswersData}
        />
      ))}
      
      <div className="flex justify-end mt-8">
        <ActionButton 
          onClick={handleSubmit} 
          disabled={!isFormComplete() || isSubmitting}
          variant="secondary"
        >
          <span className="whitespace-nowrap">Finalizar e Ver Resultados</span>
        </ActionButton>
      </div>
    </div>
  );
};

export default DiagnosticSections;
