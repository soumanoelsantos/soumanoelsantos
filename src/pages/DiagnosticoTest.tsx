
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import DiagnosticHeader from "@/components/DiagnosticHeader";
import DiagnosticInstructions from "@/components/DiagnosticInstructions";
import DiagnosticSection from "@/components/DiagnosticSection";
import DiagnosticResultsChart from "@/components/DiagnosticResultsChart";

const DiagnosticoTest = () => {
  const { toast } = useToast();
  const [results, setResults] = useState({
    processos: { score: 0, total: 100, percentage: 0 },
    resultados: { score: 0, total: 100, percentage: 0 },
    sistemaGestao: { score: 0, total: 100, percentage: 0 },
    pessoas: { score: 0, total: 100, percentage: 0 },
  });

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
    toast({
      title: "Diagnóstico concluído!",
      description: "Seu diagnóstico foi processado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#151515] text-white">
      <div className="container mx-auto px-4 py-10">
        <DiagnosticHeader />
        
        <DiagnosticInstructions />
        
        <div className="space-y-8 my-8">
          {Object.entries(sections).map(([key, section]) => (
            <DiagnosticSection 
              key={key}
              section={section} 
              results={results}
              setResults={setResults}
              sectionKey={key}
            />
          ))}
        </div>

        <Card className="mt-10 bg-dark-primary/5 border-dark-primary/20">
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

        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleSubmit} 
            size="lg" 
            className="bg-dark-primary hover:bg-dark-primary/90 text-black"
          >
            Finalizar Diagnóstico
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticoTest;
