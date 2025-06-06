
import { perguntasPlanejamento } from "@/data/perguntasPlanejamento";
import { RespostaPlanejamento } from "@/types/planejamentoEstrategico";

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

export const calcularResultadosDiagnostico = (respostasFinal: RespostaPlanejamento[]): DiagnosticoResultados => {
  const areas = ['comercial', 'gestao', 'rh', 'marketing', 'financeiro', 'cliente', 'sistema'];
  const resultados: any = {};

  areas.forEach(area => {
    const perguntasArea = perguntasPlanejamento.filter(p => p.categoria === 'diagnostico' && p.id.includes(area));
    const respostasArea = respostasFinal.filter(r => perguntasArea.some(p => p.id === r.perguntaId));
    
    let score = 0;
    respostasArea.forEach(resposta => {
      if (resposta.resposta === 'sim') {
        score += 1;
      }
    });

    resultados[area] = {
      score,
      total: perguntasArea.length,
      percentage: perguntasArea.length > 0 ? Math.round((score / perguntasArea.length) * 100) : 0
    };
  });

  return resultados;
};

export const validateRequiredField = (resposta: string | string[]): boolean => {
  return (Array.isArray(resposta) && resposta.length === 0) ||
         (!Array.isArray(resposta) && !String(resposta).trim());
};
