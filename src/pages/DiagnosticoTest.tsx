
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import DiagnosticHeader from "@/components/DiagnosticHeader";
import DiagnosticSection from "@/components/DiagnosticSection";
import DiagnosticResultsChart from "@/components/DiagnosticResultsChart";
import WhatsAppModal from "@/components/WhatsAppModal";
import { Download } from "lucide-react";
import html2pdf from 'html2pdf.js';

interface AnswersDataType {
  [key: string]: {
    title: string;
    answers: { question: string; answer: string }[];
  };
}

const DiagnosticoTest = () => {
  const { toast } = useToast();
  const [results, setResults] = useState({
    processos: { score: 0, total: 100, percentage: 0 },
    resultados: { score: 0, total: 100, percentage: 0 },
    sistemaGestao: { score: 0, total: 100, percentage: 0 },
    pessoas: { score: 0, total: 100, percentage: 0 },
  });
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [answersData, setAnswersData] = useState<AnswersDataType>({
    processos: { title: "", answers: [] },
    resultados: { title: "", answers: [] },
    sistemaGestao: { title: "", answers: [] },
    pessoas: { title: "", answers: [] }
  });
  const pdfRef = useRef<HTMLDivElement>(null);

  const sections = {
    processos: {
      title: "PROCESSOS",
      questions: [
        "Os principais processos do negócio estão documentados.",
        "Quando aparecem problemas, não somente apagamos incêndios, as causas são investigadas.",
        "Os colaboradores tem clareza da missão, visão, valores, políticas, ações e objetivos.",
        "Existem indicadores mapeados e monitorados.",
        "Acontecem reuniões de alinhamento das tarefas com as equipes (gerenciamento da rotina).",
        "Os colaboradores sabem exatamente o que fazer, pois existe um manual (ou documento) de cultura/orientações.",
        "São realizados planos de ação para alcançar as metas/objetivos.",
        "Existe uma dose adequada de planejamento antes da execução.",
        "Temos uma mentalidade de melhoria contínua, utilizando a ferramenta PDCA",
        "Temos um organograma documentado e compartilhado com todos."
      ],
      pointValue: 10,
    },
    resultados: {
      title: "RESULTADOS",
      questions: [
        "A margem de lucro do negócio é mensurada e está em nível satisfatório.",
        "A satisfação do cliente é mensurada e está em nível satisfatório.",
        "A satisfação do colaborador é mensurada e está em nível satisfatório.",
        "Existe remuneração atrelada ao desempenho (ao menos para as pessoas chave) na organização?",
        "A taxa de crescimento da empresa geralmente é maior que a esperada/planejada."
      ],
      pointValue: 20,
    },
    sistemaGestao: {
      title: "SISTEMA DE GESTÃO",
      questions: [
        "É feito planejamento anualmente para curto, médio e longo prazo (01 a 03 ou 01 a 05 anos).",
        "Os sistemas da informação (softwares) são adequados para o nível de maturidade/momento da empresa.",
        "As metas são bem estabelecidas sempre contemplando: indicador, prazo e valor.",
        "Existe por parte dos Donos/Líderes alocamento de tempo adequado para a parte estratégica da empresa.",
        "Os indicadores são acompanhados e comunicados para a equipe."
      ],
      pointValue: 20,
    },
    pessoas: {
      title: "PESSOAS",
      questions: [
        "Existem ações de comunicação interna/endomarketing para gerar engajamento nas pessoas.",
        "O processo de recrutamento, seleção & integração é adequadamente conduzido.",
        "Os colaboradores recebem feedback periódico sobre seu desempenho.",
        "Talento e perfil dos colaboradores são mapeados com alguma ferramenta de Assessment (DISC, MBTI ou outros).",
        "É feito um planejamento e descrição de cada cargo?",
        "A Liderança (incluindo os donos) tem uma comunicação clara, flexível e adequada.",
        "A Liderança (incluindo os donos) realizam e oportunizam treinamentos técnicos e comportamentais.",
        "A Liderança (incluindo os donos) executam estratégias de engajamento da equipe.",
        "A Liderança (incluindo os donos) delegam de forma efetiva.",
        "O ambiente físico da empresa está adequado às necessidades das atividades e dos funcionários?"
      ],
      pointValue: 10,
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleSendResults = (whatsappNumber: string) => {
    setShowModal(false);
    setShowResults(true);
    toast({
      title: "Diagnóstico enviado!",
      description: `Os resultados foram enviados para o WhatsApp ${whatsappNumber}.`,
    });
  };

  const generateActionPlan = () => {
    let actionPlan: {
      [key: string]: string[];
    } = {};
    
    // Processos
    if (results.processos.percentage < 50) {
      actionPlan.processos = [
        "Implementar a documentação dos principais processos do negócio",
        "Desenvolver um sistema de investigação de causas de problemas",
        "Criar documentação clara de missão, visão e valores para compartilhar com a equipe",
        "Estabelecer indicadores chave de desempenho (KPIs) para monitoramento"
      ];
    } else if (results.processos.percentage < 80) {
      actionPlan.processos = [
        "Aprimorar a documentação dos processos existentes",
        "Implementar reuniões regulares de alinhamento com a equipe",
        "Desenvolver um manual de cultura e orientações para novos colaboradores"
      ];
    } else {
      actionPlan.processos = [
        "Refinar processos existentes para maior eficiência",
        "Implementar ciclos de melhoria contínua (PDCA)"
      ];
    }
    
    // Resultados
    if (results.resultados.percentage < 50) {
      actionPlan.resultados = [
        "Implementar sistema de medição de margem de lucro",
        "Criar pesquisas de satisfação do cliente",
        "Desenvolver pesquisas de clima organizacional para medir satisfação dos colaboradores"
      ];
    } else if (results.resultados.percentage < 80) {
      actionPlan.resultados = [
        "Aprimorar os sistemas de medição existentes",
        "Implementar programa de remuneração por desempenho"
      ];
    } else {
      actionPlan.resultados = [
        "Otimizar estratégias para aumentar a taxa de crescimento",
        "Refinar o sistema de remuneração por desempenho"
      ];
    }
    
    // Sistema de Gestão
    if (results.sistemaGestao.percentage < 50) {
      actionPlan.sistemaGestao = [
        "Implementar planejamento anual estruturado",
        "Avaliar e melhorar os sistemas de informação",
        "Estabelecer metas claras com indicadores, prazos e valores"
      ];
    } else if (results.sistemaGestao.percentage < 80) {
      actionPlan.sistemaGestao = [
        "Aprimorar o acompanhamento de indicadores",
        "Garantir tempo adequado para atividades estratégicas"
      ];
    } else {
      actionPlan.sistemaGestao = [
        "Refinar o sistema de comunicação de indicadores",
        "Otimizar o processo de planejamento estratégico"
      ];
    }
    
    // Pessoas
    if (results.pessoas.percentage < 50) {
      actionPlan.pessoas = [
        "Implementar ações de comunicação interna e endomarketing",
        "Estruturar processo de recrutamento e seleção",
        "Implementar sistema de feedback periódico",
        "Mapear talentos e perfis dos colaboradores"
      ];
    } else if (results.pessoas.percentage < 80) {
      actionPlan.pessoas = [
        "Desenvolver descrições de cargo",
        "Implementar programas de treinamento técnico e comportamental",
        "Aprimorar estratégias de engajamento da equipe"
      ];
    } else {
      actionPlan.pessoas = [
        "Aprimorar as habilidades de delegação da liderança",
        "Avaliar e melhorar o ambiente físico de trabalho"
      ];
    }
    
    return actionPlan;
  };

  const downloadPDF = () => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;
    const opt = {
      margin: 10,
      filename: 'diagnostico-negocio.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();

    toast({
      title: "Download iniciado!",
      description: "O PDF do seu diagnóstico está sendo gerado.",
    });
  };

  const actionPlan = generateActionPlan();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#151515] text-white">
      <div className="container mx-auto px-4 py-10">
        <DiagnosticHeader />
        
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

        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleSubmit} 
            size="lg" 
            className="bg-[#1d365c] hover:bg-[#1d365c]/90 text-white"
          >
            Finalizar Diagnóstico
          </Button>
        </div>

        {showResults && (
          <div ref={pdfRef} className="mt-10 space-y-8">
            <Card className="bg-dark-primary/5 border-dark-primary/20">
              <CardHeader className="bg-[#1d365c] text-white">
                <CardTitle className="text-xl text-center">Resultados do Diagnóstico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Table className="text-white">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dimensão</TableHead>
                          <TableHead>Atual</TableHead>
                          <TableHead>Desejado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">PROCESSOS</TableCell>
                          <TableCell>{results.processos.percentage}%</TableCell>
                          <TableCell>100%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">RESULTADOS</TableCell>
                          <TableCell>{results.resultados.percentage}%</TableCell>
                          <TableCell>100%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">SISTEMA DE GESTÃO</TableCell>
                          <TableCell>{results.sistemaGestao.percentage}%</TableCell>
                          <TableCell>100%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">PESSOAS</TableCell>
                          <TableCell>{results.pessoas.percentage}%</TableCell>
                          <TableCell>100%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-center items-center">
                    <DiagnosticResultsChart data={results} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-primary/5 border-dark-primary/20">
              <CardHeader className="bg-[#1d365c] text-white">
                <CardTitle className="text-xl text-center">Plano de Ação</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {Object.entries(actionPlan).map(([key, actions]) => (
                    <div key={key} className="border-b border-white/10 pb-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {key === 'processos' ? 'PROCESSOS' : 
                         key === 'resultados' ? 'RESULTADOS' : 
                         key === 'sistemaGestao' ? 'SISTEMA DE GESTÃO' : 'PESSOAS'}
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {Array.isArray(actions) && actions.map((action, index) => (
                          <li key={index} className="text-white">{action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-4 print:hidden">
              <Button 
                onClick={downloadPDF} 
                className="bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <Download className="mr-2" size={18} />
                Baixar Diagnóstico em PDF
              </Button>
            </div>
          </div>
        )}
        
        <WhatsAppModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSubmit={handleSendResults} 
        />
      </div>
    </div>
  );
};

export default DiagnosticoTest;
