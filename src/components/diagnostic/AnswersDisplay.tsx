
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { AnswersDataType } from '@/types/diagnostic';
import { CheckCircle, XCircle, MinusCircle, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AnswersDisplayProps {
  answersData: AnswersDataType;
}

const AnswersDisplay = ({ answersData }: AnswersDisplayProps) => {
  const [openBenefits, setOpenBenefits] = useState<{[key: string]: boolean}>({});

  if (!answersData || Object.keys(answersData).length === 0) {
    return null;
  }

  // Map the answer value to a human-readable label and icon
  const getAnswerIcon = (answer: string) => {
    switch (answer) {
      case 'satisfactory':
        return <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />;
      case 'unsatisfactory':
        return <XCircle className="h-5 w-5 text-red-500 shrink-0" />;
      case 'partial':
        return <MinusCircle className="h-5 w-5 text-yellow-500 shrink-0" />;
      default:
        return null;
    }
  };

  const getAnswerLabel = (answer: string) => {
    switch (answer) {
      case 'satisfactory':
        return 'Satisfatório';
      case 'unsatisfactory':
        return 'Insatisfatório';
      case 'partial':
        return 'Parcial';
      default:
        return 'Não respondido';
    }
  };

  // Get the benefit explanation for each question
  const getBenefitExplanation = (question: string, sectionKey: string) => {
    // Create a mapping of questions to their benefits explanation
    const benefitsMap: {[key: string]: string} = {
      // Processos
      "Existe um fluxo claro dos processos comerciais": 
        "Processos comerciais bem definidos aumentam a eficiência nas vendas e melhoram a experiência do cliente. Você terá maior previsibilidade, melhor conversão e redução de tempo desperdiçado em atividades sem valor agregado.",
      
      "Existe sistema de gestão empresarial": 
        "Um sistema de gestão integrado permite controle total da operação, reduz erros manuais, automatiza tarefas repetitivas e fornece dados precisos para decisões estratégicas, aumentando sua produtividade em até 40%.",
      
      // Pessoas
      "Existem ações de comunicação interna/endomarketing para gerar engajamento nas pessoas": 
        "Equipes engajadas são 21% mais produtivas e reduzem em até 59% a rotatividade. Comunicação interna eficaz fortalece a cultura organizacional e alinha todos aos objetivos da empresa.",
      
      "O processo de recrutamento, seleção & integração é adequadamente conduzido": 
        "Processos de seleção estruturados reduzem em 70% a contratação de profissionais inadequados, diminuindo custos com retrabalho. A integração adequada aumenta em 58% a retenção de talentos no primeiro ano.",
      
      "Os colaboradores recebem feedback periódico sobre seu desempenho": 
        "Avaliações regulares de desempenho aumentam a produtividade em 39% e ajudam a identificar necessidades de treinamento, elevando o desempenho da equipe e fortalecendo o comprometimento.",
      
      "Talento e perfil dos colaboradores são mapeados com alguma ferramenta de Assessment (DISC, MBTI ou outros)": 
        "O mapeamento de perfis comportamentais proporciona alocação mais eficiente dos talentos, melhora a comunicação interpessoal e aumenta em até 23% o engajamento da equipe.",
      
      "É feito um planejamento e descrição de cada cargo?": 
        "Descrições de cargo claras aumentam a produtividade em 25%, reduzem conflitos internos e facilitam processos de contratação e promoção, trazendo mais clareza para toda a equipe.",
      
      "A Liderança (incluindo os donos) tem uma comunicação clara, flexível e adequada": 
        "Líderes com boa comunicação aumentam o engajamento da equipe em 40%, reduzem conflitos e promovem um ambiente de trabalho mais saudável e produtivo.",
      
      "A Liderança (incluindo os donos) realizam e oportunizam treinamentos técnicos e comportamentais": 
        "Empresas que investem em treinamentos têm 24% maior lucratividade e 59% menos rotatividade. Colaboradores capacitados oferecem melhores serviços e geram mais inovação.",
      
      // Sistema de Gestão
      "Existe um sistema de definição de metas e KPIs claramente definidos": 
        "Organizações com metas claras têm 3,5 vezes mais chances de serem de alto desempenho. KPIs bem definidos facilitam acompanhamento de resultados e tomada de decisão baseada em dados.",
      
      // Resultados
      "Existe um sistema de precificação": 
        "Estratégias de precificação adequadas podem aumentar a lucratividade em até 25%. Um bom sistema garante que você esteja cobrando o valor justo pelos seus produtos ou serviços.",
      
      "A margem de contribuição é calculada para cada produto/serviço": 
        "Conhecer a margem de cada produto permite identificar itens mais rentáveis, otimizar o mix de vendas e aumentar a lucratividade média do negócio em até 15%."
    };

    return benefitsMap[question] || "Implementar este processo irá melhorar a eficiência operacional, aumentar a produtividade e contribuir para o crescimento sustentável da empresa.";
  };

  const toggleBenefits = (questionKey: string) => {
    setOpenBenefits({
      ...openBenefits,
      [questionKey]: !openBenefits[questionKey]
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Suas Respostas</h3>
        <p className="text-sm text-gray-600">Veja abaixo todas as perguntas e respostas do diagnóstico</p>
      </div>
      
      <Accordion type="multiple" className="px-4 py-2">
        {Object.entries(answersData).map(([sectionKey, sectionData]) => (
          <AccordionItem value={sectionKey} key={sectionKey}>
            <AccordionTrigger className="text-left font-medium">
              {sectionData.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-1">
                {sectionData.answers?.map((answer, index) => (
                  <div key={index} className="border border-gray-100 rounded-md p-3 transition-all hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getAnswerIcon(answer.answer)}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 mb-1">{answer.question}</p>
                        <p className="text-sm text-gray-500 mb-2">{getAnswerLabel(answer.answer)}</p>
                        
                        <Collapsible 
                          open={openBenefits[`${sectionKey}-${index}`]} 
                          onOpenChange={() => toggleBenefits(`${sectionKey}-${index}`)}
                        >
                          <CollapsibleTrigger className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                            <Info size={14} className="mr-1" />
                            <span>Ver importância e benefícios</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2 p-3 bg-blue-50 text-sm rounded-md text-gray-700 border border-blue-100">
                            {getBenefitExplanation(answer.question, sectionKey)}
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AnswersDisplay;
