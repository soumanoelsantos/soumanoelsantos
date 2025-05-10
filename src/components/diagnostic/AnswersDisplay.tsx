
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
    // Create a mapping of questions to their personalized benefits explanation
    const benefitsMap: {[key: string]: string} = {
      // Processos
      "Os principais processos do negócio estão documentados.": 
        "A documentação dos processos principais cria um padrão operacional que reduz em até 35% os erros internos, facilita o treinamento de novos colaboradores e permite escalar o negócio com consistência. Empresas com processos documentados têm uma taxa 2,4x maior de sucesso em iniciativas de transformação digital.",
      
      "Quando aparecem problemas, não somente apagamos incêndios, as causas são investigadas.":
        "Investigar as causas-raiz dos problemas em vez de apenas resolver os sintomas reduz em até 80% a recorrência dos mesmos problemas. Isso significa menos tempo perdido, menor desgaste da equipe e aumento da confiabilidade dos seus serviços ou produtos.",
      
      "Os colaboradores tem clareza da missão, visão, valores, políticas, ações e objetivos.":
        "Quando todos entendem o propósito e direção da empresa, há um aumento de 29% no engajamento e 27% na retenção de talentos. Decisões são tomadas com mais autonomia e alinhadas aos objetivos organizacionais, acelerando resultados.",
      
      "Existem indicadores mapeados e monitorados.":
        "Empresas que utilizam indicadores de desempenho (KPIs) têm 3x mais chances de atingir suas metas. O monitoramento constante permite ajustes rápidos de estratégia, alocação eficiente de recursos e identificação precoce de oportunidades e ameaças.",
      
      "Acontecem reuniões de alinhamento das tarefas com as equipes (gerenciamento da rotina).":
        "Reuniões estruturadas de alinhamento aumentam a produtividade em 23% e reduzem o tempo desperdiçado em retrabalho. Sua equipe terá mais clareza sobre prioridades, prazos e interdependências, melhorando a colaboração e resultados.",
      
      "Os colaboradores sabem exatamente o que fazer, pois existe um manual (ou documento) de cultura/orientações.":
        "Um manual de cultura claro reduz em 50% o tempo de integração de novos funcionários e melhora a consistência na entrega. Você terá uma equipe mais alinhada aos valores da empresa e maior preservação da cultura organizacional durante o crescimento.",
      
      "São realizados planos de ação para alcançar as metas/objetivos.":
        "Empresas que implementam planos de ação estruturados têm 76% mais chances de atingir suas metas. Você transformará objetivos abstratos em passos concretos, com responsáveis e prazos definidos, aumentando o compromisso com resultados.",
      
      "Existe uma dose adequada de planejamento antes da execução.":
        "O planejamento adequado reduz em 30% os custos de projetos e em 70% as chances de falhas na execução. Sua empresa economizará recursos, terá menos retrabalho e maior previsibilidade nos resultados dos projetos e iniciativas.",
      
      "Temos uma mentalidade de melhoria contínua, utilizando a ferramenta PDCA":
        "A metodologia PDCA (Planejar, Fazer, Checar, Agir) aumenta em 31% a taxa de sucesso em projetos de melhoria. Sua empresa desenvolverá uma cultura de aprendizado constante, adaptação rápida a mudanças e aprimoramento sistemático de processos.",
      
      "Temos um organograma documentado e compartilhado com todos.":
        "Um organograma claro reduz em 25% os conflitos internos relacionados a papéis e responsabilidades. Todos entenderão a estrutura hierárquica, caminhos de comunicação e possibilidades de crescimento na empresa.",
        
      "Existe um fluxo claro dos processos comerciais": 
        "Processos comerciais bem definidos aumentam a eficiência nas vendas e melhoram a experiência do cliente. Você terá maior previsibilidade, melhor conversão e redução de tempo desperdiçado em atividades sem valor agregado.",
      
      "Existe sistema de gestão empresarial": 
        "Um sistema de gestão integrado permite controle total da operação, reduz erros manuais, automatiza tarefas repetitivas e fornece dados precisos para decisões estratégicas, aumentando sua produtividade em até 40%.",
      
      // Resultados
      "A margem de lucro do negócio é mensurada e está em nível satisfatório.":
        "Monitorar a margem de lucro permite identificar tendências, otimizar precificação e alocar recursos em áreas mais rentáveis. Empresas que acompanham este indicador têm 22% mais lucratividade do que concorrentes que não o fazem.",
      
      "A satisfação do cliente é mensurada e está em nível satisfatório.":
        "Clientes satisfeitos têm 3x mais probabilidade de comprar novamente e 5x mais de recomendar sua empresa. Medir a satisfação permite identificar pontos de melhoria na jornada do cliente e construir vantagens competitivas duradouras.",
      
      "A satisfação do colaborador é mensurada e está em nível satisfatório.":
        "Funcionários satisfeitos são 31% mais produtivos e empresas com alto engajamento têm 59% menos rotatividade. Medir a satisfação da equipe permite criar um ambiente de trabalho onde os talentos querem permanecer e se desenvolver.",
      
      "Existe remuneração atrelada ao desempenho (ao menos para as pessoas chave) na organização?":
        "Sistemas de remuneração por desempenho aumentam em 44% a produtividade dos colaboradores e alinham esforços individuais às metas organizacionais. Você atrairá e reterá profissionais mais qualificados e orientados a resultados.",
      
      "A taxa de crescimento da empresa geralmente é maior que a esperada/planejada.":
        "Crescer acima do planejado indica capacidade de inovação, agilidade e bom posicionamento de mercado. Acompanhar este indicador permite identificar fatores de sucesso que podem ser replicados e potencializados.",
      
      "A margem de contribuição é calculada para cada produto/serviço": 
        "Conhecer a margem de cada produto permite identificar itens mais rentáveis, otimizar o mix de vendas e aumentar a lucratividade média do negócio em até 15%.",
      
      "Existe um sistema de precificação": 
        "Estratégias de precificação adequadas podem aumentar a lucratividade em até 25%. Um bom sistema garante que você esteja cobrando o valor justo pelos seus produtos ou serviços.",
      
      // Sistema de Gestão
      "É feito planejamento anualmente para curto, médio e longo prazo (01 a 03 ou 01 a 05 anos).":
        "Empresas com planejamento estratégico estruturado têm 2,3x mais chances de ter desempenho acima da média do setor. Você terá clareza na direção, preparação para cenários futuros e melhor alocação de recursos ao longo do tempo.",
      
      "Os sistemas da informação (softwares) são adequados para o nível de maturidade/momento da empresa.":
        "Sistemas adequados ao momento da empresa aumentam a produtividade em 27% e reduzem custos operacionais. Você evitará tanto desperdício com sistemas subutilizados quanto limitações de crescimento por infraestrutura insuficiente.",
      
      "As metas são bem estabelecidas sempre contemplando: indicador, prazo e valor.":
        "Metas SMART (específicas, mensuráveis, alcançáveis, relevantes e temporais) aumentam em 70% as chances de serem atingidas. Sua equipe terá maior foco, melhor direcionamento de esforços e métricas claras de sucesso.",
      
      "Existe por parte dos Donos/Líderes alocamento de tempo adequado para a parte estratégica da empresa.":
        "Líderes que dedicam tempo adequado à estratégia geram empresas com crescimento 40% maior. Você deixará de ser refém da operação diária e terá capacidade de antecipar tendências e planejar o futuro do negócio.",
      
      "Os indicadores são acompanhados e comunicados para a equipe.":
        "Compartilhar indicadores com a equipe aumenta em 37% o engajamento e melhora a tomada de decisão em todos os níveis. Todos entenderão como seu trabalho impacta os resultados globais e terão maior senso de responsabilidade.",
      
      "Existe um sistema de definição de metas e KPIs claramente definidos": 
        "Organizações com metas claras têm 3,5 vezes mais chances de serem de alto desempenho. KPIs bem definidos facilitam acompanhamento de resultados e tomada de decisão baseada em dados.",
      
      // Pessoas
      "Existem ações de comunicação interna/endomarketing para gerar engajamento nas pessoas.": 
        "Equipes engajadas são 21% mais produtivas e reduzem em até 59% a rotatividade. Comunicação interna eficaz fortalece a cultura organizacional e alinha todos aos objetivos da empresa.",
      
      "O processo de recrutamento, seleção & integração é adequadamente conduzido.": 
        "Processos de seleção estruturados reduzem em 70% a contratação de profissionais inadequados, diminuindo custos com retrabalho. A integração adequada aumenta em 58% a retenção de talentos no primeiro ano.",
      
      "Os colaboradores recebem feedback periódico sobre seu desempenho.": 
        "Avaliações regulares de desempenho aumentam a produtividade em 39% e ajudam a identificar necessidades de treinamento, elevando o desempenho da equipe e fortalecendo o comprometimento.",
      
      "Talento e perfil dos colaboradores são mapeados com alguma ferramenta de Assessment (DISC, MBTI ou outros)": 
        "O mapeamento de perfis comportamentais proporciona alocação mais eficiente dos talentos, melhora a comunicação interpessoal e aumenta em até 23% o engajamento da equipe.",
      
      "É feito um planejamento e descrição de cada cargo?": 
        "Descrições de cargo claras aumentam a produtividade em 25%, reduzem conflitos internos e facilitam processos de contratação e promoção, trazendo mais clareza para toda a equipe.",
      
      "A Liderança (incluindo os donos) tem uma comunicação clara, flexível e adequada": 
        "Líderes com boa comunicação aumentam o engajamento da equipe em 40%, reduzem conflitos e promovem um ambiente de trabalho mais saudável e produtivo.",
      
      "A Liderança (incluindo os donos) realizam e oportunizam treinamentos técnicos e comportamentais": 
        "Empresas que investem em treinamentos têm 24% maior lucratividade e 59% menos rotatividade. Colaboradores capacitados oferecem melhores serviços e geram mais inovação.",
      
      "A Liderança (incluindo os donos) executam estratégias de engajamento da equipe.":
        "Estratégias de engajamento aumentam em 21% a produtividade e reduzem em 41% o absenteísmo. Você terá uma equipe mais motivada, leal e comprometida com os objetivos da empresa.",
      
      "A Liderança (incluindo os donos) delegam de forma efetiva.":
        "Líderes que delegam efetivamente aumentam a produtividade da equipe em 33% e liberam tempo para atividades estratégicas. Sua empresa desenvolverá novos líderes e terá capacidade de crescer de forma sustentável.",
      
      "O ambiente físico da empresa está adequado às necessidades das atividades e dos funcionários?":
        "Ambientes de trabalho adequados aumentam a produtividade em 17% e reduzem em 30% o absenteísmo por problemas de saúde. Sua equipe terá maior conforto, segurança e condições ideais para desempenhar suas funções."
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
