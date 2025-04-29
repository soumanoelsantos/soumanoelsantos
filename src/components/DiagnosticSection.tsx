
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
}

const DiagnosticSection = ({ section, sectionKey, results, setResults }: DiagnosticSectionProps) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  useEffect(() => {
    // Calculate the score based on answers
    let satisfactoryCount = 0;
    
    Object.values(answers).forEach(answer => {
      if (answer === 'satisfactory') {
        satisfactoryCount += 1;
      }
    });
    
    const score = satisfactoryCount * section.pointValue;
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
  }, [answers, section.pointValue, sectionKey, setResults, section.questions.length]);

  return (
    <Card className="bg-dark-primary/5 border-dark-primary/20">
      <CardHeader className="bg-[#1d365c] text-white">
        <CardTitle className="text-xl text-center">{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {section.questions.map((question, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-white/10 pb-4">
              <div className="md:col-span-6 text-white">
                <p>{question}</p>
              </div>
              <div className="md:col-span-6">
                <RadioGroup 
                  className="flex flex-col md:flex-row justify-between md:justify-end gap-4"
                  value={answers[index]}
                  onValueChange={(value) => handleAnswerChange(index, value)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-md ${answers[index] === 'satisfactory' ? 'bg-green-600/20' : ''}`}>
                      <RadioGroupItem value="satisfactory" id={`${sectionKey}-q${index}-satisfactory`} className="text-green-500" />
                    </div>
                    <Label htmlFor={`${sectionKey}-q${index}-satisfactory`} className="text-white">
                      Existe e é satisfatório
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-md ${answers[index] === 'unsatisfactory' ? 'bg-yellow-600/20' : ''}`}>
                      <RadioGroupItem value="unsatisfactory" id={`${sectionKey}-q${index}-unsatisfactory`} className="text-yellow-500" />
                    </div>
                    <Label htmlFor={`${sectionKey}-q${index}-unsatisfactory`} className="text-white">
                      Existe, mas não é satisfatório
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-md ${answers[index] === 'nonexistent' ? 'bg-red-600/20' : ''}`}>
                      <RadioGroupItem value="nonexistent" id={`${sectionKey}-q${index}-nonexistent`} className="text-red-500" />
                    </div>
                    <Label htmlFor={`${sectionKey}-q${index}-nonexistent`} className="text-white">
                      Não existe
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-[#1d365c] text-white text-center">
          Na dimensão <strong>{section.title}</strong>, para cada item assinalado "Existe e é satisfatório" atribua {section.pointValue} pontos
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosticSection;
