
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface DiagnosticSectionProps {
  section: {
    title: string;
    questions: string[];
    pointValue: number;
  };
  sectionKey: string;
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
  setAnswersData?: React.Dispatch<React.SetStateAction<{
    [key: string]: {
      title: string;
      answers: { question: string; answer: string }[];
    };
  }>>;
}

const DiagnosticSection = ({ section, sectionKey, results, setResults, setAnswersData }: DiagnosticSectionProps) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  useEffect(() => {
    // Calculate the score based on answers with different point values
    let score = 0;
    
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      // Different scoring for different sections
      if (sectionKey === 'processos' || sectionKey === 'pessoas') {
        // For Processos and Pessoas sections
        if (answer === 'satisfactory') {
          score += 10; // Existe e é satisfatório = 10 points
        } else if (answer === 'unsatisfactory') {
          score += 5; // Existe, mas não é satisfatório = 5 points
        }
        // Não existe = 0 points (no need to add anything)
      } else {
        // For Sistema de Gestão and Resultados sections
        if (answer === 'satisfactory') {
          score += 20; // Existe e é satisfatório = 20 points
        } else if (answer === 'unsatisfactory') {
          score += 10; // Existe, mas não é satisfatório = 10 points
        }
        // Não existe = 0 points (no need to add anything)
      }
    });
    
    const total = section.questions.length * section.pointValue;
    const percentage = Math.round((score / total) * 100) || 0;

    // Update the results
    setResults(prev => ({
      ...prev,
      [sectionKey]: {
        score,
        total,
        percentage
      }
    }));
    
    // Store answers data for the PDF
    if (setAnswersData) {
      setAnswersData(prev => ({
        ...prev,
        [sectionKey]: {
          title: section.title,
          answers: Object.entries(answers).map(([index, value]) => ({
            question: section.questions[Number(index)],
            answer: value
          }))
        }
      }));
    }
  }, [answers, section.pointValue, sectionKey, setResults, section.questions, section.title, setAnswersData]);

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="bg-[#1d365c] text-white">
        <CardTitle className="text-xl text-center">{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {section.questions.map((question, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-200 pb-4">
              <div className="md:col-span-6 text-gray-800">
                <p>{question}</p>
              </div>
              <div className="md:col-span-6">
                <RadioGroup 
                  className="flex flex-col md:flex-row justify-between md:justify-end gap-4"
                  value={answers[index]}
                  onValueChange={(value) => handleAnswerChange(index, value)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-md ${answers[index] === 'satisfactory' ? 'bg-green-100' : ''}`}>
                      <RadioGroupItem value="satisfactory" id={`${sectionKey}-q${index}-satisfactory`} className="text-green-600" />
                    </div>
                    <Label htmlFor={`${sectionKey}-q${index}-satisfactory`} className="text-gray-800">
                      Existe e é satisfatório
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-md ${answers[index] === 'unsatisfactory' ? 'bg-yellow-100' : ''}`}>
                      <RadioGroupItem value="unsatisfactory" id={`${sectionKey}-q${index}-unsatisfactory`} className="text-yellow-600" />
                    </div>
                    <Label htmlFor={`${sectionKey}-q${index}-unsatisfactory`} className="text-gray-800">
                      Existe, mas não é satisfatório
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-md ${answers[index] === 'nonexistent' ? 'bg-red-100' : ''}`}>
                      <RadioGroupItem value="nonexistent" id={`${sectionKey}-q${index}-nonexistent`} className="text-red-600" />
                    </div>
                    <Label htmlFor={`${sectionKey}-q${index}-nonexistent`} className="text-gray-800">
                      Não existe
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-[#1d365c] text-white text-center">
          <p>Na dimensão <strong>{section.title}</strong>:</p>
          {(sectionKey === 'processos' || sectionKey === 'pessoas') ? (
            <p>"Existe e é satisfatório" = 10 pontos | "Existe, mas não é satisfatório" = 5 pontos | "Não existe" = 0 pontos</p>
          ) : (
            <p>"Existe e é satisfatório" = 20 pontos | "Existe, mas não é satisfatório" = 10 pontos | "Não existe" = 0 pontos</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosticSection;
